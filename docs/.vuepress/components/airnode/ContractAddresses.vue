<!--
  This component displays a list of all protocol contracts and their chain. If the chain
  is not listed in /docs/.vuepress/chains.json then any address related to it will not 
  appear in this component.
-->

<template>
  <div v-if="loaded === true">
    <!-- LOADING IMAGE -->
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
    <!-- ERROR -->
    <p v-show="error !== null" class="contract-addresses-error">
      The Chain list failed to load: ({{ error }})
    </p>

    <!-- OUTER CONTRACT LIST -->
    <div v-for="(contract, index) in contracts" :key="index">
      <h3>{{ contract.contractName }}</h3>
      <table>
        <th class="contract-addresses-heading">Chain</th>
        <th class="contract-addresses-heading">Chain ID</th>
        <th class="contract-addresses-heading">Contract Address</th>
        <tr
          v-for="(item, index) in contract.addresses"
          v-bind:key="index"
          v-show="type === item.chain.type"
          v-bind:class="{
            contract_tr_highlight: item.chain.important,
          }"
        >
          <td>
            {{ item.chain.name }}
          </td>
          <td>
            {{ item.chainId }}
          </td>
          <td NOWRAP>
            <!--a
              target="_etherscan"
              :href="'https://etherscan.io/address/' + item.address"
              :id="contract.contractName + index"
              class="contract-addresses-address"
              >{{ item.address }}</a
            ><ExternalLinkImage /-->

            <span
              :id="item.chain.type + '-' + contract.contractName + '-' + index"
              class="contract-addresses-address"
              >{{ item.address }}</span
            >

            <!-- COPY ICON 
              The style applied (style="opacity: 60%; width: 12px") is very
              important. If included in the class it will work on the dev 
              server but not on a production build.
            -->
            <span style="display: inline-block; width: 18px">
              <img
                :id="
                  'copy-icon-' +
                  item.chain.type +
                  '-' +
                  contract.contractName +
                  '-' +
                  index
                "
                v-on:click="
                  copyAddress(
                    item.chain.type + '-' + contract.contractName + '-' + index
                  )
                "
                src="/img/copy.png"
                class="contract-addresses-copy-icon"
                style="opacity: 60%; width: 12px"
              />
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import chains from '../../chains.json';
export default {
  name: 'ContractAddresses',
  props: ['type'],
  data: () => ({
    loaded: false,
    showSpinner: true,
    error: null,
    contracts: [],
  }),
  methods: {
    copyAddress(id) {
      var copyText = document.getElementById(id).textContent;
      var copyIcon = document.getElementById('copy-icon-' + id);
      copyIcon.style.opacity = '100%';
      copyIcon.style.width = '20px';
      window.setTimeout(this.setCopiedTimeout, 700, copyIcon);

      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(copyText);
    },
    setCopiedTimeout(element) {
      element.style.opacity = '60%';
      element.style.width = '12px';
    },
  },
  mounted() {
    this.$nextTick(async function () {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/airnode/master/packages/airnode-protocol/deployments/references.json'
        );

        // These are holders of specific chains that go on top of each contract's
        // array, under them chains are sort A-Z.
        // In testnets, start with ropsten, rinkeby, goerli, kovan,
        // then continue with the others in A-Z order.
        let mainnetObj = [];
        let ropstenObj = [];
        let rinkebyObj = [];
        let goerliObj = [];
        let kovanObj = [];

        // Create a list of contracts with addresses
        for (const key in response.data) {
          // ADDRESSES
          let addresses = [];
          for (const key2 in response.data[key]) {
            const add = {
              address: response.data[key][key2],
              chainId: key2,
              chain: chains[key2] || { name: 'Unknown' },
            };
            if (add.chainId === '1') mainnetObj = add;
            else if (add.chainId === '3') ropstenObj = add;
            else if (add.chainId === '4') rinkebyObj = add;
            else if (add.chainId === '5') goerliObj = add;
            else if (add.chainId === '42') kovanObj = add;
            else addresses.push(add);
          }
          addresses = addresses.filter((item) => item.chain.type === this.type);
          // Sort addresses by  chain name
          addresses.sort((a, b) => (a.chain.name > b.chain.name ? 1 : -1));

          // Move mainnet to top, then testnets
          addresses.unshift(kovanObj);
          addresses.unshift(goerliObj);
          addresses.unshift(rinkebyObj);
          addresses.unshift(ropstenObj);
          addresses.unshift(mainnetObj);

          // Build contract with addresses
          let contract = { contractName: key, addresses: addresses };
          this.contracts.push(contract);
        }
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }

      // Need to reorder the response.data by contract
      // AirnodeRrp, RequesterAuthorizerWithAirnode, AccessControlRegistry first
      // then any "other" contracts that might be present

      // AccessControlRegistry
      let index = this.contracts.findIndex(
        (x) => x.contractName === 'AccessControlRegistry'
      );
      let contract = this.contracts.splice(index, 1);
      this.contracts.unshift(contract[0]);
      // RequesterAuthorizerWithAirnode
      index = this.contracts.findIndex(
        (x) => x.contractName === 'RequesterAuthorizerWithAirnode'
      );
      contract = this.contracts.splice(index, 1);
      this.contracts.unshift(contract[0]);
      // AirnodeRrp
      index = this.contracts.findIndex((x) => x.contractName === 'AirnodeRrp');
      contract = this.contracts.splice(index, 1);
      this.contracts.unshift(contract[0]);

      // Page state
      this.showSpinner = false;
      this.loaded = true;
    });
  },
};
</script>

<style lang="stylus">

.contract-addresses-address{
    font-family: courier;
    font-size: small;
}
.contract-addresses-heading{
    text-align:left;
}
.contract-addresses-error{
    color:red;
}
.contract-addresses-table tr:nth-child(even) td {
  background: white;
}
.contract-addresses-copy-icon{
    margin-left:5px
    cursor:pointer;
    height:11px;
}
.contract_tr_highlight td {
  background-color: #e5ecf9;
  /*-webkit-transition: all 1s linear;*/
}
</style>
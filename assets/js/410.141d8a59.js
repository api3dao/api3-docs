(window.webpackJsonp=window.webpackJsonp||[]).push([[410],{1072:function(e,t,n){"use strict";n.r(t);var s=n(9),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),n("h1",{attrs:{id:"frontmatter-title"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),n("VersionWarning"),e._v(" "),n("TocHeader"),e._v(" "),n("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),n("p",[e._v("Airnode is a serverless oracle node implemented with a "),n("em",[e._v('"set and forget"')]),e._v(" "),n("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/airnode/design-philosophy.html"}},[e._v("philosophy")]),e._v(".")],1),e._v(" "),n("p",[e._v("Airnode is capable of serving one or more APIs to it's\n"),n("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/requester.html"}},[e._v("requesters")]),e._v(" which are smart contracts on chain who request the\ndata server by the particular Airnode. Each Airnode has a\n"),n("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/guides/build-an-airnode/configuring-airnode.html#airnodewalletmnemonic"}},[e._v("unique mnemonic")]),e._v("\nidentifying its wallet. This mnemonic is kept in secret and Airnode is publicly\nidentified using the default "),n("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/airnode.html#airnodeaddress"}},[e._v("address")]),e._v(" derived from\nthe mnemonic.")],1),e._v(" "),n("h2",{attrs:{id:"airnodeaddress"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#airnodeaddress"}},[e._v("#")]),e._v(" "),n("code",[e._v("airnodeAddress")])]),e._v(" "),n("p",[e._v("An Airnode is identified by the default address of a BIP 44 wallet (with the\npath "),n("code",[e._v("m/44'/60'/0'/0/0")]),e._v("). This address is same for all chains on which Airnode\noperates. You specify the wallet mnemonic in the\n"),n("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/guides/build-an-airnode/configuring-airnode.html#creating-secrets-env"}},[n("code",[e._v("secrets.env")])]),e._v("\nfile which you use when deploying the Airnode.")],1),e._v(" "),n("p",[e._v("You can also use ethers.js to derive the "),n("code",[e._v("airnodeAddress")]),e._v(" from the mnemonic for\ninformational purposes.")]),e._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Get the default address of the airnode-wallet using its mnemonic.")]),e._v("\nairnodeHdNode "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" ethers"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("utils"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("HDNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("fromMnemonic")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("mnemonic"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\nairnodeAddress "),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" airnodeHdNode"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("address"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br")])]),n("h2",{attrs:{id:"xpub"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#xpub"}},[e._v("#")]),e._v(" "),n("code",[e._v("xpub")])]),e._v(" "),n("p",[e._v("The Airnode owner announces their extended public key ("),n("code",[e._v("xpub")]),e._v(" of the hardened\nderivation path "),n("code",[e._v("m/44'/60'/0'")]),e._v(") off-chain for sponsors to be able to derive\ntheir "),n("RouterLink",{attrs:{to:"/airnode/v0.4/concepts/sponsor.html#sponsorwallet"}},[e._v("sponsor wallets")]),e._v(". This wallet will then be used\nby the Airnode to fulfill each request made by the requester contracts. The\n"),n("code",[e._v("xpub")]),e._v(" that the owner has announced is not verified on-chain.")],1),e._v(" "),n("p",[e._v("However, the sponsor can verify it off-chain. You can use the\n"),n("RouterLink",{attrs:{to:"/airnode/v0.4/reference/packages/admin-cli.html#verify-airnode-xpub"}},[n("code",[e._v("verify-xpub")])]),e._v(" command\nfrom the admin CLI.")],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);
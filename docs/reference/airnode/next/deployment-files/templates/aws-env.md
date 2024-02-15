---
title: aws.env
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Deployment Files → Templates
path: /reference/airnode/next/deployment-files/templates/aws-env.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The `aws.env` contains AWS credentials from an IAM user. These credentials are
used by the Docker
[deployer image](/reference/airnode/next/docker/deployer-image.md) to deploy an
Airnode to AWS. For more details, see the full description of the
[aws.env](/reference/airnode/next/deployment-files/templates/aws-env.md) file.
Variable names cannot contain dashes (-) or start with a number.

```sh
AWS_ACCESS_KEY_ID=<FILL_*>
AWS_SECRET_ACCESS_KEY=<FILL_*>
```

<FlexEndTag/>

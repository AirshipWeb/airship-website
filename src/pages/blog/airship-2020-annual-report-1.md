---
templateKey: blog-post
title: Airship 2020 Annual Report
author: Allison Price
date: 2021-01-28T16:25:22.785Z
category:
  - label: News & Announcements
    value: category-A7fnZYrE1
---
Since Airship was announced as an OpenStack Foundation pilot project at the 2018 OpenStack Summit in Vancouver, it has provided operators with a unified, fully-declarative, versatile platform that transforms bare-metal infrastructure into a resilient Kubernetes cluster supporting user-defined workloads. At the Denver Open Infrastructure Summit in 2019, the Airship project committed to overhauling the platform by improving document management, re-imagining the upgrade workflow, and utilizing additional Cloud Native projects to provide Airship functionality with the next generation of Airship: Airship 2.

This year, the Airship community is delighted to announce that it has delivered on its commitment. While Airship 2 remains in beta, development is quickly progressing towards a first-quarter general availability release in 2021. Additionally, Airship 2 has been designated as a Certified Kubernetes Distribution through the Cloud Native Computing Foundation's Software Conformance Program, guaranteeing that Airship provides a consistent installation of Kubernetes, supports the latest Kubernetes versions, and provides a portable cloud-native environment with other Certified Platforms.

The first change that operators will notice when previewing Airship 2 is its enhanced document management capabilities. Using the Airship 2 command-line-interface, airshipctl, operators can organize and deliver YAML documents that describe an Airship 2 region with phases: logical groups of functionality that are the building blocks of a site. Airshipctl renders phases with Kustomize, a tool that has been widely adopted by the Kubernetes community. Using Kustomize with airshipctl, operators can keep their YAML footprint small with advanced manipulation tools that reduce data duplication.

Operators familiar with Airship 1 will also notice improvements to the Airship upgrade process. Cloud Native tools such as the Baremetal Operator with Metal3 and Ironic, Kubeadm, and Kustomize have replaced the Airship 1 control plane. In Airship 2, operators can drive upgrades using Airshipctl and let Kubernetes handle the rest—the core Airship components are ephemeral and live outside the control plane.

Airship 2 supports public cloud providers, enabling operators to use the same workflow to manage their workloads on bare-metal, Microsoft Azure, Google Cloud Platform, AWS, and Openstack. Companies with growing requirements can rely on Airship for consistent deployment and management of workloads on Kubernetes, knowing that OpenDev and third-party continuous-integration provided by Ericsson validate these integration points.

2020 also brought greater diversification to the Airship community contributor base. The community elected its second Working and Technical Committees in 2020, adding additional representation from Dell EMC and Insight Global to the existing share of committee members from Accenture, AT&T, Ericsson, and Mirantis. Several companies more than doubled their contributions to Airship. Ericsson's contributions, or commits and reviews, were up 32.5% in the Victoria release from their total in the Train release, Dell EMC 91%, and Mirantis increased their contributions by a whopping 889%.

![](/img/airship-2020-newkey2.jpg)

<br>In February 2020, the Cloud Infrastructure Telco Taskforce (CNTT) chose Airship for their OpenStack reference implementation, providing the global telecom community with a model for deploying NFV workloads using Airship. CNTT seeks to accelerate deployment and management of NFV applications by providing models, or reference implementations, for various telecom use-cases. CNTT includes representatives from over thirty operators, including AT&T, Verizon Wireless, China Mobile, and Deutsche Telekom.

As Airship finalizes the general availability release of Airship 2, operators will see additional NFVi use-cases in Treasuremap. The Airship community revealed two new projects, the Support Infrastructure Provider (SIP) and the Virtual Node Operator (ViNO), at the end of 2020 to provide Kubernetes multi-tenancy in Airship for Containerized Networking Function (CNF) use-cases. In conjunction with Airship, the OpenStack-Helm project will also release OpenStack on Airship 2 using airshipctl phases.

Last year, the Airship community also saw the introduction of a new Vulnerability Management Process where operators can disclose security vulnerabilities in private, the adoption of GitHub issues for release tracking and planning alongside CNCF communities, and the first Airship User Survey. With an upcoming general availability release of Airship 2, the explosive growth of the community, and additional NFVi features, 2021 is shaping up to be another prosperous year for the Airship community.

Get involved:

* Github: <https://github.com/airshipit>
* IRC: #airshipit
* Mailing Lists: [lists.airshipit.org](lists.airshipit.org)
* Slack: [airshipit.slack.com](airshipit.slack.com)

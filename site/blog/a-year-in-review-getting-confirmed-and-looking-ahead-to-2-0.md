---
title: 'A year in review: getting confirmed and looking ahead to 2.0'
author: alex-hughes
date: 2020-01-28T21:29:57.592Z
category: News & Announcements
---
[Airship](https://www.airshipit.org/) established incredible momentum in 2019, including confirmation by the OSF as a top-level project in October, a crucial stage of Airship’s maturity. <!-- more -->

The confirmation as a top-level project signifies the community’s many accomplishments since being announced as a pilot project supported by the OSF in May 2018, namely:

* Airship's deep involvement with the OSF community
* Active participation in both Open Infrastructure Summits and Project Teams Gathering (PTG)
* Embrace of the four opens with source code hosted on OpenStack infrastructure
* Open governance and mature operation with an open weekly design meeting
* Code reviews through OpenStack-hosted Gerrit
* Active participation in a Foundation-wide forum session on establishing open governance

![](https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/Uploads/growth-of-community-201912.png?r)

Airship is a robust mechanism for cloud operators who want to embrace containers as the new unit of infrastructure delivery at scale to manage the entire lifecycle of data center infrastructure using a unified, declarative, fully containerized, cloud native platform. Airship 1.0 was released at the Open Infrastructure Summit Denver in April. Its enterprise-readiness includes enhanced platform security, resiliency and platform deployment tooling. Airship 2.0 design and development was kicked off post 1.0 release. Its technical roadmap includes leveraging meta3-io for bare metal provisioning, the Cluster-API for Kubernetes bootstrapping and lifecycle management, Containerized Network Function (CNF) support, leverage cloud native workflow management (e.g. Argo), Helm v3 and Armada Operator, edge use cases, and YAML management improvement, etc. The picture below represents the target Airship 2.0 architecture:

![AirshipDiagram2](https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/Uploads/AirshipDiagram2.png)

##### Key highlights in 2019

![](https://object-storage-ca-ymq-1.vexxhost.net/swift/v1/6e4619c416ff4bd19e1c087f27a43eea/www-assets-prod/Uploads/AS-960x260.jpg)

* Airship 1.0 released in April 2019
* Confirmed as a top-level project supported by the OpenStack Foundation in October 2019
* A continued trend of community growth release after release of OpenStack
* Enhancements to Airship including:
* * Full resiliency against control plane node failure (to 1 node)
  * Added support for OpenStack Stein deployment via Airship (Train being developed now)
  * Per patch set virtualized deployment and testing
  * End to end encryption on the wire and at rest
* The adoption of formal governance – and establishing both a Technical and Working Committee
* Regular blog posts of Airship 2.0 evolution
* Monthly newsletter to potential supporters of Airship community

The Airship team is excited to share the future plans – a complete rebuild of Airship core code migration from Python to Golang with an alpha release planned for early 1Q 2020, a beta release late 2Q 2020, and a full 2.0 release in 2020. In addition, Airship 2.0 will penetrate into more industry domains such as common telco NFVi and 5G testbed etc.

##### What to look forward to with Airship 2.0

* Support smaller deployments
* Workflows will be fully declarative
* Adopting upstream entrenched projects
* Simpler document creation and management (Airship YAML was hard)
* An improved flow for executing updates (changing the tires while the car is moving is hard)
* Penetrate into NFVi domain, enable the reference implementation of Common Telco NFVi (CNTT) and support its VNF certification.
* Ericsson and Dell are donating hardware for Airship community lab to leverage as 3rd-party CI
* Empower the 5G testbed by Ericsson

##### Airship Channels and Meetings

* IRC: #airshipit on Freenode
* [Twitter](https://twitter.com/airshipproject)
* [Website](https://airshipit.org/)
* [YouTube](https://www.youtube.com/playlist?list=PLKqaoAnDyfgp8YjZbzjVrmZBJR9thV27y)
* [Mailing Lists](http://lists.airshipit.org/cgi-bin/mailman/listinfo)(discuss and announce)
* Developer Meetings: Tuesdays 9 AM CST in #airshipit on Freenode
* Design Meetings: Thursdays, 10:00am-11:30am CST (see mailing list for invitation)
* Special Interest Groups:
* * YAML: Mondays, 10:00am-11:00am CST
  * Bootstrap: Wednesdays, 9:00am-10:00am CST
  * UI: Fridays, 12:00-1:00pm CST

The OpenStack Foundation (OSF) just published its [2019 annual report](https://www.openstack.org/foundation/2019-openstack-foundation-annual-report). Learn more about other OSF projects and how you can get involved.

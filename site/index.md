---
layout: Home
title: Home

hero:
  headline: Elevate Your Infrastructure
  button:
    title: Get Started
    url: https://airshipit.readthedocs.io/en/latest/dev-getting-started.html
    
getInvolvedSteps:
  - title: Join us on the mailing list
    entry: Receive email announcements and interact with the community.
    link:
      url: http://lists.airshipit.org/cgi-bin/mailman/listinfo
      title: lists.airshipit.org/cgi-bin/mailman/listinfo
  - title: Weekly calls
    entry: Updates from the community on a weekly basis.
    link:
      url: https://wiki.openstack.org/wiki/Airship#Get_in_Touch
      title: wiki.openstack.org/wiki/Airship#Get_in_Touch
  - title: Freenode IRC
    entry: Chat with the project team and others using Airship.
    link:
      url: https://wiki.openstack.org/wiki/Airship#Get_in_Touch
      title: "#airshipit"
---

<home-content>

<template slot="about">

## About Airship

Airship is a collection of loosely coupled but interoperable open source tools that declaratively automate cloud provisioning. Airship is a robust delivery mechanism for organizations who want to embrace containers as the new unit of infrastructure delivery at scale. Starting from raw bare metal infrastructure, Airship manages the full lifecycle of data center infrastructure to deliver a production-grade Kubernetes cluster with Helm deployed artifacts, including OpenStack-Helm. Airship allows operators to manage their infrastructure deployments and lifecycle through the declarative YAML documents that describe an Airship environment.

<a href="https://git.airshipit.org/cgit/airship-in-a-bottle/" class="link is-primary"><strong>Try Airship in a Bottle</strong>></a>

</template>

<home-announcement slot="announcement" button-name="Read the Release Notes" link="https://wiki.openstack.org/wiki/Airship_Release_Candidate">

In November 2018, the Airship community debuted a Release Candidate, which is already being run in production at organizations like AT&T, and is ready for testing and contribution from the broader community. The community has been actively developing the release candidate since the project was introduced as an OSF pilot project in May and has achieved security at scale, scalable operations and reliable upgrades, as well nightly CI/CD validation of integrations and example deployments.The community expects to release version 1.0 in Q1 2019. 

</home-announcement>

</home-content>

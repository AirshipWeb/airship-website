---
title: Software
description: Development activities in Airship
---

<div class="video-wrapper">
  <iframe width="835 px" height="469.687 px" src="https://www.youtube.com/embed/0eEisMm9ykg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>
<br>

The introduction of containers has led to a revolution in how applications are deployed and maintained through the use of powerful container orchestration platforms like Kubernetes. Airship applies these principles of application management to datacenter operations, allowing operators to declare their entire infrastructure up front.

Airship has a single workflow for managing both initial installations and updates. An operator only needs to make a change to an Airship YAML configuration, and the Airship platform does the rest of the work. When managing complex IaaS projects such as OpenStack, anything from minor service configuration updates to major upgrades are all handled in the same way: by simply modifying the YAML configuration and submitting it to the Airship runtime.


<br>

<div class="columns">
  <div class="column">
    <div class="box is-green">
     <div class="box-text"><div class="software-icon"><figure class="image is-64x64">
      <img src="../.vuepress/theme/svg/Airship_Icon.svg">
      </figure></div><h3 class="is-software">Get Airship</h3>
      <a href="https://git.airshipit.org/cgit">
        Go to Git repository &nbsp <img src="../.vuepress/theme/svg/arrow-left_green.svg">
      </a></div>
    </div>
  </div>
  <div class="column">
    <div class="box is-green">
     <div class="box-text"><div class="software-icon" style="align-content: middle"><figure class="image is-64x64">
      <img style="height: 56.13px" src="../.vuepress/theme/svg/document.svg">
      </figure></div><h3 class="is-software">View the Documentation</h3>
      <a href="https://airship-treasuremap.readthedocs.io/en/latest/">
        Go to Treasuremap &nbsp <img src="../.vuepress/theme/svg/arrow-left_green.svg">
      </a></div>
    </div>
  </div>
</div>

<br>

<div class="h2_green">Airship Enables:</div>  
<br>

#### Platform Integration

Airship combines the most popular virtualization platform, OpenStack, with the most popular container platform, Kubernetes.  Airship delivers a resilient Kubernetes and Helm infrastructure as the foundation in order to deploy and manage Airship components as well as several OpenStack services that integrate with Airship directly.  Airship then uses this same Kubernetes infrastructure to deliver any number of user-facing Helm applications, including a fully featured high-availability OpenStack cloud using OpenStack-Helm. Airship is a flexible application deployment and life cycle engine that functions with any Helm chart based application allows the system to easily deploy and manage entirely new applications with only minor declarative YAML changes.

#### Security at Scale

The fully integrated toolchain automatically applies industry best-practices for securing data centers. TLS-enabled service endpoints and encrypted storage of secrets make for a secure platform across your entire data center.  The production-grade Kubernetes cluster that Airship provides aims to provide best practice and resilient configurations out of the box.

#### Scalable Operations

By leveraging Kubernetes and Helm, critical services can automatically scale under load and can robustly survive hardware failure. The platform also bundles many infrastructure needs that are required whether leveraging OpenStack-Helm or other software sets--things such as log collection, search capabilities, monitoring, alerting, graphing, as well as network security policies.

#### Reliable Upgrades

Critical services can be upgraded with confidence, with gradual roll-outs (including the ability to roll-back), and guaranteed data and virtual machine integrity across container application upgrades. There's no need to shut down any services or live-migrate any virtual machines through the upgrade process.

<br>

---

<a href="/collateral/Airship_OnePager.pdf" target="_blank"><strong>View this overview document for helpful information.</strong></a>
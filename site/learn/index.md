---
description: An overview of the Airship project
title: Learn
---

Donec vulputate ullamcorper lorem. Quisque volutpat nec leo ac cursus. Phasellus consectetur ligula eget sapien elementum, a eleifend nunc bibendum. Morbi ut ultrices odio. Nunc facilisis luctus dolor ut laoreet. Quisque augue eros, mattis vel odio ut, sollicitudin molestie libero. Nunc leo nunc, consequat et commodo sit amet, suscipit eget justo. Nulla venenatis congue mattis. Maecenas tempus convallis dolor a pharetra. Nulla dictum ornare iaculis. Cras non libero rutrum, facilisis orci a, consequat nisl.

<br>

  <table class="table is-bordered" style="width:100%">
    <thead>
        <tr>
            <th class="is-usecase-header-left">Use Case</th>
            <th class="is-usecase-header-right">Benefits</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="is-usecase-left">Traditional Cloud Workloads</td>
            <td class="is-usecase-right">Leverage Airship to deploy both OpenStack-Helm and OpenStack-Helm Logging Monitoring and Alerting to create and manage a full production grade OpenStack environment.</td>
      </tr>
      <tr>
            <td class="is-usecase-left">CI/CD Environment</td>
            <td class="is-usecase-right">Airship can provide a Kubernetes based containerized CI/CD environment (e.g. gerrit, jenkins, zuul) along with OpenStack VMs for test flexibility.</td>
      </tr>
      <tr>
            <td class="is-usecase-left">Region Controller</td>
            <td class="is-usecase-right">Airship combined with containerized CI/CD and Artifactory
            deployments can support centralized management of a fleet of independent Airship installations.</td>
      </tr>
      <tr>
            <td class="is-usecase-left">Containerized Network Functions</td>
            <td class="is-usecase-right">Provide a Kubernetes environment allowing tenants to create Containerized Network Functions directly on bare metal Kubernetes.</td>
      </tr>
    <tr>
            <td class="is-usecase-left">Generic Helm Workloads</td>
            <td class="is-usecase-right">Deploy and manage the life cycle of a bare metal Kubernetes Cluster as well as any set of helm-based software on top, e.g. TensorFlow, Hadoop, ElasticSearch, Kafka.</td>
      </tr>
    </tbody>
  </table>

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

Looking for more information? [**Read the FAQs**](/faq/).
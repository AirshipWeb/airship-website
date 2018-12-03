<template>
  <main class="main">
    <hero class="hero-main is-primary" withButton :title="$page.frontmatter.hero.headline" :image="require('../theme/images/Airship_Hero.png')">
      <template slot="buttons">
        <a :href="$page.frontmatter.hero.button.url" class="button is-primary-dark is-rounded">
          <span>{{ $page.frontmatter.hero.button.title }}</span>

          <span class="ico">
            <img :src="require('../theme/svg/arrow-left.svg')" alt="View the Code" />
          </span>
        </a>
      </template>
    </hero>

    <base-article :image="require('../theme/images/Airship_Diagram_SimplifiedArchitecture.jpg')">
      <slot name="about"></slot>
    </base-article>
<!-- Features Table -->    
<div class="features-section">
<div class="container">
  <h2 class="features">Features</h2>
  <table class="table" style="width:100%; background-color: white;">
    <tbody>
      <tr>
        <td class="is-selected"><img class="feature-icons" :src="require('../theme/svg/simple.svg')" alt="Simple"/><h6>Simple</h6></td>
        <td>Infrastructure is managed through declarative YAML files and there is one workflow for both deployments and updates. Airship does not require operators to develop their own set of complex orchestration tooling to automate Airship.</td>
      </tr>
      <tr>
        <td class="is-selected"><img class="feature-icons" :src="require('../theme/svg/flexible.svg')" alt="Flexible"/><h6>Flexible</h6></td>
        <td>Containers and Helm charts are the basic unit of deployment for all software including Airship itself, pushing software orchestration logic to the edge. Expanding the software stack is as simple as adding new charts to Airship declarations.</td>
      </tr>
      <tr>
        <td class="is-selected"><img class="feature-icons" :src="require('../theme/svg/repeatable.svg')" alt="Repeatable"/><h6>Repeatable</h6></td>
        <td>Platform state including all versions are specified declaratively, and Airship, Helm, and Kubernetes align containers, dependencies, and configuration in the same way every time</td>
      </tr>
      <tr>
        <td class="is-selected"><img class="feature-icons" :src="require('../theme/svg/resilient.svg')" alt="Resilient"/><h6>Resilient</h6></td>
        <td>All jobs and services are running as containers, provide health status, and are healed by Kubernetes supervision by taking full advantage of native Kubernetes resiliency.</td>
      </tr>
      <tr>
        <td class="is-selected"><img class="feature-icons" :src="require('../theme/svg/self_hosted.svg')" alt="Self-Hosted"/><h6>Self-Hosted</h6></td>
        <td>The Airship components themselves are deployed as Helm charts and run as services within Kubernetes.  This allows them to be upgraded like any other software component in the system.</td>
      </tr>
    </tbody>
  </table>
</div>  
</div>
<!-- /Features Table -->
    <base-section class="section-modified">
      <div class="section-inner">
        <div class="columns">
          <div class="column">
            <list-numeric title="How to Get Involved" :items="$page.frontmatter.getInvolvedSteps">
              <template slot-scope="{ item }">
                <h6>{{ item.title }}</h6>

                <p>{{ item.entry }}</p>

                <a :href="item.link.url">{{ item.link.title }}</a>
              </template>
            </list-numeric>
          </div><!-- /.column -->

          <div class="column">
            <slot name="announcement"></slot>
          </div><!-- /.column -->
        </div><!-- /.columns -->
      </div><!-- /.section-inner -->
    </base-section>
  </main><!-- /.main -->
</template>

<script>
export default {
  /**
   * The name of the component.
   *
   * @type {Strng}
   */
  name: "HomeContent"
};
</script>
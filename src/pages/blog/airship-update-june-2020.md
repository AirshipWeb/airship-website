---
templateKey: blog-post
title: Airship Update - June 2020
author: Alexander Hughes
date: 2020-06-15T12:00:00.000Z
category:
  - id: category-C98iZYrE1
    label: Airship 2.0
---
What follows is the Airship Community Update for the month of June 2020, brought to you by the Airship Technical
Committee.<!-- more -->

## **AIRSHIP BLOG**

The Airship blog is a great way to keep up with what's going on in the community. The Airship community publishes
[_blog posts_](https://www.airshipit.org/blog/) regularly, including the recent Airship 2.0 Blog series. These blog
posts introduce the changes from Airship 1.0 to Airship 2.0, highlight new features, and detail the evolution of each
component. The first six Airship 2.0 Blog posts are already available, and illustrate the design thoughts on the road to
the alpha milestone:

_**UPDATE 03-August-2020:** Airship 2.0 development spans multiple milestones. Upon completing the first major
milestone, Alpha, the community took some time to reflect on lessons learned and how they impacted the direction and
design of Airship 2.0. We have summarized these lessons learned and how the design has changed over time - including
using different technologies and approaches. You can read more about these changes here: [Airship 2.0 is Alpha - Lessons
Learned](https://www.airshipit.org/blog/airship2-is-alpha/). We recommend reviews these changes before reading blogs
marked as "Pre-Alpha."_

- [*Pre-Alpha Airship Blog Series 1 - Evolution Towards 2.0*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-1-evolution-towards-2.0/)
- [*Pre-Alpha Airship Blog Series 2 - An Educated Evolution*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-2-an-educated-evolution/)
- [*Pre-Alpha Airship Blog Series 3 - Airship 2.0 Architecture High Level*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-3-airship-2.0-architecture-high-level/)
- [*Pre-Alpha Airship Blog Series 4 - Shipyard - an Evolution of the Front Door*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-4-shipyard-an-evolution-of-the-front-door/)
- [*Pre-Alpha Airship Blog Series 5 - Drydock and Its Relationship to Cluster API*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-5-drydock-and-its-relationship-to-cluster-api/)
- [*Pre-Alpha Airship Blog Series 6 - Armada Growing Pains*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-6-armada-growing-pains/)

<br>

Stay tuned for more exciting news on the Airship blog series as Airship 2.0 progresses through the beta milestone and
beyond!

<br>

## **JUNE VIRTUAL PTG**

On 04-05 June Airship participated in the OSF hosted Virtual PTG. The PTG facilitated productive cross-team
collaborations with StarlingX, Ironic, and the Edge Working Group. Feedback provided to the PTG organizers by attendees
has been very positive. What follows is a summary of the PTG:

In general, the attendees were satisfied with the times selected striking a good balance across timezones, between
virtual and PTG. Most attendees were also in favor of the focused two days PTG that did not require full focus for an
entire week.

Conversations with StarlingX included an update on Airship 2.0 and laid out the deprecation cycle for Armada. We are
encouraging the StarlingX community to check out the Flux Helm Operator which will be replacing Armada in Airship 2.0.
For more details on Armada's evolution from Airship 1.0 to Airship 2.0 see this [_blog post_](
https://www.airshipit.org/blog/pre-alpha-airship-blog-series-6-armada-growing-pains/).

There was Airship representation at the Edge Working group, to provide an update on Airship 2.0 and how it targets
various edge computing use cases.

Airship worked closely with the OpenStack-Helm team with a focus on code review and working through security scope.

Representing the Airship community was Noor from Dell at the Ironic sessions. These sessions highlighted some potential
future paths forward with vendor variations of Redfish.

The planned agenda [_here_](https://etherpad.opendev.org/p/airship-virtual-ptg-2020) was a perfect fit for the allotted
time.

<br>

**Thursday** [_Recording_](https://zoom.us/rec/share/xet8Lo7TrV1IZYHQ2nvwfIQFD5bLeaa813MbqPoFzUf_4sK9L5ZUm-iVI2PjxEUU), Password: 1y^!8j#7

* Secret Generation
* Deployment Configurations
* Testing

<br>

**Friday** [_Recording_](https://zoom.us/rec/share/-ZRVN-vPrlNIbIHVtGWGcekFLqPZaaa8gXQY-vJfzB7G6T7TXuktuLtXfkmzhf71), Password: 8l?*62HJ

* Hardware-Classification-Controller Updates
* YAML Authoring / Structure Walkthrough
* Helm Operator
* AirshipUI Update and Demo
* Deployment Configurations Continued
* Roundtable

<br>

## **AIRSHIP USER SURVEY**

If you are evaluating or running Airship, share your feedback in the [_Airship User Survey_](https://www.surveymonkey.com/r/YKZ9NC2)! This survey provides users an opportunity to provide anonymous feedback to
influence the community and software direction. By sharing information about your configuration and requirements, the
Airship Working Committee will be able to advocate on your behalf. The 2020 survey results will be presented at the Fall
Summit, November, 2020. Take the [_Airship User Survey_](https://www.surveymonkey.com/r/YKZ9NC2) to be included in this
round of analysis.

<br>

## **AIRSHIP TECHNICAL COMMITTEE ELECTION**

The Airship community adopted formal [_governance_](https://opendev.org/airship/governance) in 2019 leading to the
creation of two committees responsible for helping to guide Airship projects. Each of these committees is elected by
the community to serve for one year at a time.

Over the next two weeks the Working Committee (WC) is organizing an election to fill all five seats for the 2020-2021 Technical
Committee term. Earlier today the first phase, nominations, began and was announced via the mailing list which you can
subscribe to [_here_](http://lists.airshipit.org/cgi-bin/mailman/listinfo).

Anyone who has demonstrated a commitment to Airship (community building, communications, or had code merged to the
Airship project repositories) within the last 12 months is eligible to run for the Technical Committee (TC). Anyone who is a
Contributor (someone who has had changes merged within the last 12 months to any Airship project repository) before the
election will be eligible to vote for the TC candidates. There are no term limits, but in order to encourage diversity,
no more than two of the five seats can be filled by any one organization. The TC will meet regularly in an
open forum with times and locations published in community channels.

For more details for eligibility, responsibilities, and election processes please see the [_Airship Governance_](https://opendev.org/airship/governance).

<br>

## **UPCOMING AIRSHIP WORKING COMMITTEE ELECTION**

Next month, in July, the current Working Committee (WC) term will end, and elections to fill all five seats for the 2020-2021
Technical Committee (TC) term will be held.

Anyone who has had changes merged within the last 12 months to an Airship project is eligible to run for the Working
Committee. Anyone who is a Core Reviewer of any Airship Project before the election will be eligible to vote for the WC
candidates. There are no term limits, but in order to encourage diversity, no more than two of the five seats can be filled
by any one organization. The Working Committee will meet regularly in an open forum with times and locations published
in community channels.

For more details for eligibility, responsibilities, and election processes please see the [_Airship Governance_](https://opendev.org/airship/governance).

<br>

## **AIRSHIP 2.0 PROGRESS**

The progress shown below is for [_airshipctl_](https://opendev.org/airship/airshipctl), the new Airship 2.0 client.

Last month, [_airshipctl_](https://opendev.org/airship/airshipctl) saw the following activity:

* 16 authors
* 49 commits
* 222 files changed
* 4,851 additions
* 924 deletions
* 31 closed issues
* 27 new issues

<br>

This activity is contributing to the beta milestone, below is the overall status of the beta milestone:

![](/images/beta_status_june_2020.png)

<br>

## **GET INVOLVED**

This [_page_](https://www.airshipit.org/community/) lists everything you need to know to get involved and start
contributing. 

<br>

**Alexander Hughes, on behalf of the [_Airship Technical Committee_](https://wiki.openstack.org/wiki/Airship/Airship-TC)**

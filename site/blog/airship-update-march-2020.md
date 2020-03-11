---
title: Airship Update - March 2020
author: alex-hughes
date: 2020-03-11T12:00:00.000Z
category: Airship 2.0
---

What follows is the Airship Community Update for the month of March, 2020, brought to you by the Airship Technical
Committee.<!-- more -->

## **SPOTLIGHT ON ....**

- Daylight Saving Time impact on community meetings. If you do not observe Daylight Saving Time please note that meeting
times are now one hour earlier than they were previously. For the current meeting list and their schedules check the
[*Airship Wiki*](https://wiki.openstack.org/wiki/Airship#Get_in_Touch).

<br>

## **AIRSHIP BLOG**

The Airship blog is a great way to keep up with what's going on in the community. The Airship community publishes
[*blog posts*](https://www.airshipit.org/blog/) regularly, including the recent Airship 2.0 Blog series. These blog
posts introduce the changes from Airship 1.0 to Airship 2.0, highlight new features, and detail the evolution of each
component. The first six Airship 2.0 Blog posts are already available:

- [*Airship Blog Series 1 - Evolution Towards 2.0*](
  https://www.airshipit.org/blog/airship-blog-series-1-evolution-towards-2.0.html)
- [*Airship Blog Series 2 - An Educated Evolution*](
   https://www.airshipit.org/blog/airship-blog-series-2-an-educated-evolution.html)
- [*Airship Blog Series 3 - Airship 2.0 Architecture High Level*](
   https://www.airshipit.org/blog/airship-blog-series-3-airship-2.0-architecture-high-level.html)
- [*Airship Blog Series 4 - Shipyard - an Evolution of the Front Door*](
   https://www.airshipit.org/blog/airship-blog-series-4-shipyard-an-evolution-of-the-front-door.html)
- [*Airship Blog Series 5 - Drydock and Its Relationship to Cluster API*](
  https://www.airshipit.org/blog/airship-blog-series-5-drydock-and-its-relationship-to-cluster-api.html)
- [*Airship Blog Series 6 - Armada Growing Pains*](
   https://www.airshipit.org/blog/airship-blog-series-6-armada-growing-pains.html)

<br>

## **GITHUB ISSUE PROGRESS**

In the [*February Update*](https://www.airshipit.org/blog/airship-update-february-2020.html) I mentioned that Airship
scope was now being tracked in [*Github Issues*](https://github.com/airshipit/airshipctl/issues).

Last month airshipctl saw the following activity:
- 15 authors
- 81 commits
- 315 files changed
- 13,517 additions
- 1,761 deletions
- 40 closed issues
- 46 new issues

<br>

Which has contributed to the progress towards Airship 2.0's first major milestone: Alpha.  Below is the overall progress
towards the alpha milestone:

![](/images/alpha_status_march.png)

<br>

## **NEW COMMUNICATION PLATFORM OPTIONS**

In the OpenStack Foundation, communication by IRC is commonplace. The airship community maintains the **#airshipit**
channel on Freenode IRC. As the Airship2 project grows there is an increasing need to collaborate with projects which
use Slack as their primary communication platform such as [*metal3.io*](http://metal3.io/community-resources.html).

To make communication in both Slack and IRC convenient, the Airship community has also set up a Slack channel which
mirrors back to IRC - giving community members an option to use just one platform to communicate within Airship and with
the communities supporting specific projects.

You can join the new Slack channel [*here*](https://airshipproject.slack.com/). Note: Slack does not allow
self-registration for all e-mail domains to all channels. If your e-mail domain is not listed, request an invitation
by sending an e-mail to [*andrew.walters@att.com*](mailto:andrew.walters@att.com).

<br>

## **SECURITY VULNERABILITY MANAGEMENT**

The Airship community is committed to confirming, resolving, and disclosing all reported security vulnerabilities.

The Airship project has automated security scanning in place using [*Bandit*](https://pypi.org/project/bandit/) for
Python projects such as Pegleg and Promenade, and [*Gosec*](https://github.com/securego/gosec) for Golang projects such
as airshipctl. All docker images are available on [*Quay.io*](https://quay.io/organization/airshipit) and are scanned by
Quay's security scanner, which is backed by [*Clair*](https://github.com/quay/clair).

The Airship community recently added the following
[*documentation*](https://airshipit.readthedocs.io/projects/airship-docs/en/latest/security/guide.html) for more
information on how detected vulnerabilities are confirmed, resolved, and disclosed.

<br>

## **GET INVOLVED**

This [page](https://www.airshipit.org/community/) lists everything you need to know to get involved and start
contributing. 

<br>

**Alexander Hughes, on behalf of the [Airship Technical Committee](
https://wiki.openstack.org/wiki/Airship/Airship-TC)**

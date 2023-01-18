---
'@faustwp/cli': patch
---

Fixed an issue where telemetry data could be incomplete. Now, if the request to get telemetry data from WordPress fails, we will not continue on with the telemetry request.

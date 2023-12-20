---
'@faustwp/cli': major
---

**BREAKING**: Removed telemetry CLI commands for `faust telemetry enable/disable/status` for managing and viewing telemetry opt-in status. Telemetry functionality has been moved to the Faust WordPress plugin. Sites that previously opted in from CLI will no longer send telemetry data unless someone opts in from the WordPress side.

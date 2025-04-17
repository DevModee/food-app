# Changelog

## [1.0.0]
### Features
- Initial project structure with separation between the mobile app and API backend.
- Basic authentication implemented with working registration and login.
- Register, Login, and Home screens in the app with navigation between them.
- API connected to the mobile app with user-related endpoints.

## [1.1.0]
### Features
- Created `WeightContext` to manage weight data globally.
- Integrated a line chart using `react-native-gifted-charts` in the Home screen.
- Updated App to include navigation and context for `HomeScreen`.

### Fixes
- Fixed weight input form handling in the HomeScreen.
- Corrected `WeightContext` usage to ensure proper functionality in HomeScreen.

## [1.2.0]
### Features
- Fully implemented registration and login with user creation via the API.
- Persisted username in AsyncStorage after successful registration or login.
- Added validation to prevent submission of empty username or password fields.
- Proper redirection to the Home screen after successful authentication.

### Fixes
- Improved error handling and messaging for failed authentication attempts.

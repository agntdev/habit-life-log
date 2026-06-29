# Habit & Life Log — Bot specification

**Archetype:** custom

**Voice:** warm and encouraging — write every user-facing message, button label, error, and empty state in this voice.

A private Telegram bot for daily habit tracking, mood logging, and journaling with AI-generated insights and summaries. Users can log entries via checklists and free-text notes, receive daily/weekly highlights, and manage their data with privacy controls.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- individual consumers
- users seeking AI-curated insights and statistics

## Success criteria

- users log at least one daily entry per day for 7 consecutive days
- users receive and interact with daily highlights and weekly summaries
- users can export or delete their data on demand

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open the main menu and initiate onboarding
- **/log** (command, actor: user, command: /log) — Open the daily checklist for logging habits and notes
  - inputs: checklist items, free-text notes
  - outputs: log entry confirmation, optional mood rating
- **/today** (command, actor: user, command: /today) — Show today's logged entries and summary
  - inputs: none
  - outputs: today's log summary
- **/add** (command, actor: user, command: /add) — Create a new habit or tagged entry
  - inputs: habit name, tag, frequency
  - outputs: habit template confirmation
- **/mood** (command, actor: user, command: /mood) — Record a mood rating for the current day
  - inputs: numeric or emoji mood rating
  - outputs: mood confirmation
- **/summary** (command, actor: user, command: /summary) — Request an on-demand AI summary for a specific date range
  - inputs: date range (day, week, or custom)
  - outputs: AI-generated summary
- **/export** (command, actor: user, command: /export) — Download personal data (logs, habits, summaries)
  - inputs: none
  - outputs: data export file
- **/delete** (command, actor: user, command: /delete) — Delete specific entries or all data
  - inputs: entry ID or 'all'
  - outputs: deletion confirmation
- **View full summary** (button, actor: user, callback: summary:view) — View the full AI-processed summary in chat
  - inputs: none
  - outputs: full summary text

## Flows

### onboarding
_Trigger:_ /start

1. greet user
2. ask for timezone
3. ask about daily highlights and preferred delivery time
4. explain checklist + notes flow

_Data touched:_ user profile

### daily logging
_Trigger:_ /log

1. display checklist of user-defined habits
2. allow check/uncheck actions
3. offer to add free-text note
4. record mood rating if provided

_Data touched:_ log entry

### daily highlight
_Trigger:_ scheduled daily

1. generate key stats for the day
2. generate AI insight sentence
3. send concise message with stats and insight
4. include inline button to view full summary

_Data touched:_ daily summary

### weekly summary
_Trigger:_ scheduled weekly

1. generate aggregated week stats and trends
2. generate AI analysis and suggested focus areas
3. send longer AI-generated analysis

_Data touched:_ weekly summary

### manual summary request
_Trigger:_ /summary

1. ask for date range (day, week, or custom)
2. generate AI summary for the requested range
3. send summary to user

_Data touched:_ log entries, AI summary

### data management
_Trigger:_ /export or /delete

1. confirm action
2. generate export file or delete data
3. notify user of completion

_Data touched:_ user data

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **user profile** _(retention: persistent)_ — Telegram user account with profile settings
  - fields: Telegram ID, timezone, notification preferences, retention settings
- **log entry** _(retention: persistent)_ — Daily log with checklist items and optional notes
  - fields: date/time, checklist items, free-text note, tags, mood rating, location
- **habit template** _(retention: persistent)_ — User-defined habit with optional frequency and reminders
  - fields: habit name, frequency, reminders
- **daily summary** _(retention: persistent)_ — Aggregated stats and AI insight for a day
  - fields: date, completed habits, mood average, streaks, AI insight text
- **weekly summary** _(retention: persistent)_ — Aggregated stats and AI analysis for a week
  - fields: week start date, trends, suggested focus areas, AI analysis text

## Integrations

- **Telegram** (required) — Bot API messaging and notifications
- **Free-model gateway (OpenRouter-like)** (required) — AI inference for insights and summaries
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- configure free-model gateway for AI inference
- set default notification time and timezone handling
- define retention policies for user data
- manage paid plan integration (optional)

## Notifications

- daily highlights at user-chosen time
- weekly summaries at user-chosen day/time
- reminders to log entries (user-configurable)

## Permissions & privacy

- insights and data are private to each Telegram user
- no sharing by default
- users can export or delete their data on demand
- AI model gateway access is limited to insight generation

## Edge cases

- user changes timezone after onboarding
- user requests summary for a date range with no logged entries
- user tries to delete data while another action is in progress
- AI model gateway is unavailable during summary generation

## Required tests

- end-to-end onboarding flow with timezone and notification preference setup
- daily logging with checklist and free-text note submission
- daily highlight delivery with AI insight and full summary access
- weekly summary generation and delivery
- manual summary request for custom date ranges
- data export and deletion workflows
- notification scheduling and timezone handling

## Assumptions

- users will primarily use the checklist for logging habits
- the free-model gateway will provide sufficient AI inference for insights and summaries
- Telegram's notification system will handle daily/weekly highlights reliably
- users will retain data indefinitely unless they explicitly delete it

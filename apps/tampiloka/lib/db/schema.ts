import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer, jsonb, bigint, uniqueIndex, index, check } from "drizzle-orm/pg-core";

const time = (name: string) => timestamp(name, { withTimezone: true }).notNull().defaultNow();
export const user = pgTable("user", { id: text().primaryKey(), name: text().notNull(), email: text().notNull().unique(), emailVerified: boolean("email_verified").notNull().default(false), image: text(), createdAt: time("created_at"), updatedAt: time("updated_at") });
export const session = pgTable("session", { id: text().primaryKey(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), token: text().notNull().unique(), createdAt: time("created_at"), updatedAt: time("updated_at"), ipAddress: text("ip_address"), userAgent: text("user_agent"), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }) });
export const account = pgTable("account", { id: text().primaryKey(), accountId: text("account_id").notNull(), providerId: text("provider_id").notNull(), userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"), accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }), refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }), scope: text(), password: text(), createdAt: time("created_at"), updatedAt: time("updated_at") });
export const verification = pgTable("verification", { id: text().primaryKey(), identifier: text().notNull(), value: text().notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), createdAt: time("created_at"), updatedAt: time("updated_at") });
export const forms = pgTable("forms", { id: text().primaryKey(), ownerId: text("owner_id").notNull().references(() => user.id), title: text().notNull(), slug: text().notNull().unique(), status: text().notNull().default("draft"), draft: jsonb().notNull(), draftVersion: integer("draft_version").notNull().default(1), publishedRevisionId: text("published_revision_id"), createdAt: time("created_at"), updatedAt: time("updated_at") }, t => [check("forms_status_check", sql`${t.status} in ('draft','published','closed','archived','deleted')`), check("forms_version_check", sql`${t.draftVersion} > 0`)]);
export const formSlugs = pgTable("form_slugs", { slug: text().primaryKey(), formId: text("form_id").notNull().references(() => forms.id) });
export const formRevisions = pgTable("form_revisions", { id: text().primaryKey(), formId: text("form_id").notNull().references(() => forms.id), number: integer().notNull(), schema: jsonb().notNull(), createdAt: time("created_at") }, t => [uniqueIndex("form_revisions_number_idx").on(t.formId, t.number)]);
export const submissions = pgTable("submissions", { id: text().primaryKey(), formId: text("form_id").notNull().references(() => forms.id), revisionId: text("revision_id").notNull().references(() => formRevisions.id), idempotencyKey: text("idempotency_key").notNull(), status: text().notNull().default("active"), deletedAt: timestamp("deleted_at", { withTimezone: true }), answers: jsonb().notNull(), createdAt: time("created_at") }, t => [uniqueIndex("submissions_idempotency_idx").on(t.formId, t.idempotencyKey), index("submissions_form_idx").on(t.formId), check("submissions_status_check", sql`${t.status} in ('active','archived','deleted')`)]);
export const assets = pgTable("assets", { id: text().primaryKey(), formId: text("form_id").notNull().references(() => forms.id), ownerId: text("owner_id").references(() => user.id), uploadSessionId: text("upload_session_id"), revisionId: text("revision_id").references(() => formRevisions.id), questionId: text("question_id"), objectKey: text("object_key").notNull().unique(), filename: text().notNull(), contentType: text("content_type").notNull(), size: bigint({ mode: "number" }).notNull(), state: text().notNull().default("pending"), createdAt: time("created_at"), updatedAt: time("updated_at") }, t => [check("assets_state_check", sql`${t.state} in ('pending','uploaded','attached','deleted')`), check("assets_size_check", sql`${t.size} > 0`)]);
export const submissionFiles = pgTable("submission_files", { submissionId: text("submission_id").notNull().references(() => submissions.id), assetId: text("asset_id").notNull().references(() => assets.id).unique() });
export const rateLimits = pgTable("rate_limits", { key: text().primaryKey(), count: integer().notNull(), expiresAt: timestamp("expires_at", { withTimezone: true }).notNull() });

export const jwks = pgTable("jwks", {
  id: text("id").primaryKey(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at"),
  alg: text("alg"),
  crv: text("crv"),
});

export const oauthClient = pgTable(
  "oauth_client",
  {
    id: text("id").primaryKey(),
    clientId: text("client_id").notNull().unique(),
    clientSecret: text("client_secret"),
    clientDiscoveryId: text("client_discovery_id"),
    disabled: boolean("disabled").default(false),
    skipConsent: boolean("skip_consent"),
    enableEndSession: boolean("enable_end_session"),
    subjectType: text("subject_type"),
    scopes: text("scopes").array(),
    clientCredentialsScopes: text("client_credentials_scopes")
      .array()
      .default([]),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
    name: text("name"),
    uri: text("uri"),
    icon: text("icon"),
    contacts: text("contacts").array(),
    tos: text("tos"),
    policy: text("policy"),
    softwareId: text("software_id"),
    softwareVersion: text("software_version"),
    softwareStatement: text("software_statement"),
    redirectUris: text("redirect_uris").array().notNull(),
    postLogoutRedirectUris: text("post_logout_redirect_uris").array(),
    backchannelLogoutUri: text("backchannel_logout_uri"),
    backchannelLogoutSessionRequired: boolean(
      "backchannel_logout_session_required",
    ),
    tokenEndpointAuthMethod: text("token_endpoint_auth_method"),
    applicationType: text("application_type"),
    jwks: text("jwks"),
    jwksUri: text("jwks_uri"),
    grantTypes: text("grant_types").array(),
    responseTypes: text("response_types").array(),
    requirePKCE: boolean("require_pkce"),
    dpopBoundAccessTokens: boolean("dpop_bound_access_tokens").default(false),
    referenceId: text("reference_id"),
    metadata: jsonb("metadata"),
  },
  (table) => [index("oauthClient_userId_idx").on(table.userId)],
);

export const oauthResource = pgTable("oauth_resource", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull().unique(),
  name: text("name").notNull(),
  accessTokenTtl: integer("access_token_ttl"),
  refreshTokenTtl: integer("refresh_token_ttl"),
  signingAlgorithm: text("signing_algorithm"),
  signingKeyId: text("signing_key_id"),
  allowedScopes: text("allowed_scopes").array(),
  customClaims: jsonb("custom_claims"),
  dpopBoundAccessTokensRequired: boolean(
    "dpop_bound_access_tokens_required",
  ).default(false),
  disabled: boolean("disabled").default(false),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  policyVersion: integer("policy_version").default(1),
  metadata: jsonb("metadata"),
});

export const oauthClientResource = pgTable(
  "oauth_client_resource",
  {
    id: text("id").primaryKey(),
    clientId: text("client_id")
      .notNull()
      .references(() => oauthClient.clientId, { onDelete: "cascade" }),
    resourceId: text("resource_id")
      .notNull()
      .references(() => oauthResource.identifier, { onDelete: "cascade" }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at"),
  },
  (table) => [
    index("oauthClientResource_clientId_idx").on(table.clientId),
    index("oauthClientResource_resourceId_idx").on(table.resourceId),
  ],
);

export const oauthRefreshToken = pgTable(
  "oauth_refresh_token",
  {
    id: text("id").primaryKey(),
    token: text("token").notNull().unique(),
    clientId: text("client_id")
      .notNull()
      .references(() => oauthClient.clientId, { onDelete: "cascade" }),
    sessionId: text("session_id").references(() => session.id, {
      onDelete: "set null",
    }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    referenceId: text("reference_id"),
    authorizationCodeId: text("authorization_code_id"),
    resources: text("resources").array(),
    requestedUserInfoClaims: text("requested_user_info_claims").array(),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at"),
    revoked: timestamp("revoked"),
    rotatedAt: timestamp("rotated_at"),
    rotationReplayResponse: text("rotation_replay_response"),
    rotationReplayExpiresAt: timestamp("rotation_replay_expires_at"),
    authTime: timestamp("auth_time"),
    confirmation: jsonb("confirmation"),
    scopes: text("scopes").array().notNull(),
  },
  (table) => [
    index("oauthRefreshToken_clientId_idx").on(table.clientId),
    index("oauthRefreshToken_sessionId_idx").on(table.sessionId),
    index("oauthRefreshToken_userId_idx").on(table.userId),
    index("oauthRefreshToken_authorizationCodeId_idx").on(
      table.authorizationCodeId,
    ),
  ],
);

export const oauthAccessToken = pgTable(
  "oauth_access_token",
  {
    id: text("id").primaryKey(),
    token: text("token").unique(),
    clientId: text("client_id")
      .notNull()
      .references(() => oauthClient.clientId, { onDelete: "cascade" }),
    sessionId: text("session_id").references(() => session.id, {
      onDelete: "set null",
    }),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    referenceId: text("reference_id"),
    authorizationCodeId: text("authorization_code_id"),
    resources: text("resources").array(),
    requestedUserInfoClaims: text("requested_user_info_claims").array(),
    refreshId: text("refresh_id").references(() => oauthRefreshToken.id, {
      onDelete: "cascade",
    }),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at"),
    revoked: timestamp("revoked"),
    confirmation: jsonb("confirmation"),
    scopes: text("scopes").array().notNull(),
  },
  (table) => [
    index("oauthAccessToken_clientId_idx").on(table.clientId),
    index("oauthAccessToken_sessionId_idx").on(table.sessionId),
    index("oauthAccessToken_userId_idx").on(table.userId),
    index("oauthAccessToken_authorizationCodeId_idx").on(
      table.authorizationCodeId,
    ),
    index("oauthAccessToken_refreshId_idx").on(table.refreshId),
  ],
);

export const oauthConsent = pgTable(
  "oauth_consent",
  {
    id: text("id").primaryKey(),
    clientId: text("client_id")
      .notNull()
      .references(() => oauthClient.clientId, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    referenceId: text("reference_id"),
    resources: text("resources").array(),
    requestedUserInfoClaims: text("requested_user_info_claims").array(),
    scopes: text("scopes").array().notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => [
    index("oauthConsent_clientId_idx").on(table.clientId),
    index("oauthConsent_userId_idx").on(table.userId),
  ],
);

export const oauthClientAssertion = pgTable("oauth_client_assertion", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const docsContent = `
{% section id="api-reference" title="API Reference" %}
The Stripe API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [form-encoded](https://en.wikipedia.org/wiki/POST_\\(HTTP\\)#Use_for_submitting_web_forms) request bodies, returns [JSON-encoded](http://www.json.org/) responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Stripe API in [sandboxes](https://docs.stripe.com/sandboxes.md) without affecting your live data or interacting with banking networks. The API key that you use to [authenticate](https://docs.stripe.com/api/authentication.md) the request determines whether the request runs in live mode or in a sandbox. Sandboxes support all v2 APIs. Test mode sandboxes support some [v2 APIs](https://docs.stripe.com/testing-use-cases.md#compare).

The Stripe API doesn’t support bulk updates. You can work on only one object per request.

The Stripe API differs for every account as we release new [versions](https://docs.stripe.com/api/versioning.md) and tailor functionality. Log in to see docs with your test key and data.
{% right %}
## Just getting started?

Check out our [development quickstart](https://docs.stripe.com/get-started/development-environment.md) guide.

## Not a developer?

Use Stripe’s [no-code options](https://docs.stripe.com/payments/no-code.md) or apps from [our partners](https://stripe.partners/) to get started with Stripe and to do more with your Stripe account—no code required.

\`\`\`Base_URL
https://api.stripe.com
\`\`\`

## Client Libraries

By default, the Stripe API Docs demonstrate using curl to interact with the API over HTTP. Select one of our official client libraries to see examples in code.
{% /right %}
{% /section %}

{% section id="authentication" title="Authentication" %}
The Stripe API uses [API keys](https://docs.stripe.com/keys.md) to authenticate requests. You can view and manage your API keys in [the Stripe Dashboard](https://dashboard.stripe.com/login?redirect=/apikeys).

Test mode secret keys start with \`sk_test_\` and have unrestricted access to their sandboxes. In live mode, you configure a [restricted API key](https://docs.stripe.com/keys.md#create-restricted-api-key) (starts with \`rk_live_\`) with specific API permissions. Using a restricted API key with only a subset of API permissions limits the damage a bad actor could cause if they obtained the key. In both test mode and live mode, you can create as many restricted API keys as you need for different use cases or components of your application. We also create a live mode secret key (starts with \`sk_live_\`) that grants access to all Stripe API resources. To protect your business, use restricted API keys instead.

Your API keys carry many privileges. Follow [best practices](https://docs.stripe.com/keys-best-practices.md) to keep your keys safe. Don’t embed secret or restricted API keys in source code or client-side applications. Instead, use your server platform’s secrets vault to provide keys to your server-side applications. If your platform doesn’t offer a secrets vault, set your keys in environment variables.

The Stripe API authenticates requests using [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Provide your API key as the basic auth username value. You don’t need to provide a password.

If you need to authenticate using bearer auth (for example, for a cross-origin request), use \`-H "Authorization: Bearer ,[object Object],"\` instead of \`-u ,[object Object]\`.

Connect the CLI to your Stripe account by logging in to persist your restricted or secret key locally. See also [Log in to the CLI](https://docs.stripe.com/stripe-cli.md#login-account).

Use your API key by assigning it when creating [StripeClient](https://docs.stripe.com/sdks/server-side.md#stripeclient). The Ruby/Python/PHP/Node.js/Go/Java/.NET libraries will then automatically send this key in each request.

You can also set a per-request key with an option. This is often useful for Connect applications that use multiple API keys during the lifetime of a process. Methods on the returned object reuse the same API key.

Make all API requests over [HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure). Calls made over plain HTTP fail. API requests without authentication also fail.
{% right %}
\`\`\`Authenticated_Request
curl https://api.stripe.com/v1/charges \
  -u sk_test_51TpNn5ChsAVzTaw...:
# The colon prevents curl from asking for a password.
\`\`\`

## Your API Key

Your test secret key is included in all the examples here, so you can test any example right away. Only you can see this value. Don’t include your key in code. Follow [best practices](https://docs.stripe.com/keys-best-practices.md) to keep your keys safe.
{% /right %}
{% /section %}

{% section id="errors" title="Errors" %}
Stripe uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the \`2xx\` range indicate success. Codes in the \`4xx\` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the \`5xx\` range indicate an error with Stripe’s servers (these are rare).

Some \`4xx\` errors that could be handled programmatically (e.g., a card is [declined](https://docs.stripe.com/declines.md)) include an [error code](https://docs.stripe.com/error-codes.md) that briefly explains the error reported.

## Attributes

- **advice_code** *(string, nullable)*: For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://docs.stripe.com/docs/declines.md#retrying-issuer-declines) if they provide one.
- **charge** *(string, nullable)*: For card errors, the ID of the failed charge.
- **code** *(string, nullable)*: For some errors that could be handled programmatically, a short string indicating the [error code](https://docs.stripe.com/docs/error-codes.md) reported.
- **decline_code** *(string, nullable)*: For card errors resulting from a card issuer decline, a short string indicating the [card issuer’s reason for the decline](https://docs.stripe.com/docs/declines.md#issuer-declines) if they provide one.
- **doc_url** *(string, nullable)*: A URL to more information about the [error code](https://docs.stripe.com/docs/error-codes.md) reported.
- **message** *(string, nullable)*: A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
- **network_advice_code** *(string, nullable)*: For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.
- **network_decline_code** *(string, nullable)*: For payments declined by the network, an alphanumeric code which indicates the reason the payment failed.
- **param** *(string, nullable)*: If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
- **payment_intent** *(object, nullable)*: The [PaymentIntent object](https://docs.stripe.com/docs/api/payment_intents/object.md) for errors returned on a request involving a PaymentIntent.
- **payment_method** *(object, nullable)*: The [PaymentMethod object](https://docs.stripe.com/docs/api/payment_methods/object.md) for errors returned on a request involving a PaymentMethod.
- **payment_method_type** *(string, nullable)*: If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.
- **request_log_url** *(string, nullable)*: A URL to the request log entry in your dashboard.
- **setup_intent** *(object, nullable)*: The [SetupIntent object](https://docs.stripe.com/docs/api/setup_intents/object.md) for errors returned on a request involving a SetupIntent.
- **source** *(object, nullable)*: The [source object](https://docs.stripe.com/docs/api/sources/object.md) for errors returned on a request involving a source.
- **type** *(enum)*: The type of error returned. One of \`api_error\`, \`card_error\`, \`idempotency_error\`, or \`invalid_request_error\`.
{% right %}
### HTTP Status Code Summary

| Code | Status | Description |
|---|---|---|
| **200** | OK | Everything worked as expected. |
| **400** | Bad Request | The request was unacceptable, often due to missing a required parameter. |
| **401** | Unauthorized | No valid API key provided. |
| **402** | Request Failed | The parameters were valid but the request failed. |
| **403** | Forbidden | The API key doesn’t have permissions to perform the request. |
| **404** | Not Found | The requested resource doesn’t exist. |
| **409** | Conflict | The request conflicts with another request. |
| **424** | Dependency Failed | External Dependency Failed. |
| **429** | Too Many Requests | Too many requests hit the API too quickly. |
| **500, 502, ...** | Server Errors | Something went wrong on Stripe’s end. (These are rare.) |

### Error Types

| Code | Description |
|---|---|
| **api_error** | API errors cover any other type of problem, and are extremely uncommon. |
| **card_error** | Card errors are the most common type of error you should expect to handle. |
| **idempotency_error** | Idempotency errors occur when an Idempotency-Key is re-used on a request that does not match. |
| **invalid_request_error** | Invalid request errors arise when your request has invalid parameters. |
{% /right %}
{% /section %}

{% section id="handling-errors" title="Handling errors" %}
Our Client libraries raise exceptions for many reasons, such as a failed charge, invalid parameters, authentication errors, and network unavailability. We recommend writing code that gracefully handles all possible API exceptions.

- Related guide: [Error Handling](https://docs.stripe.com/error-handling.md)
{% right %}
\`\`\`Handling_Errors_Example
# Select a client library to see examples of
# handling different kinds of errors.
\`\`\`
{% /right %}
{% /section %}

{% section id="expanding-responses" title="Expanding Responses" %}
Many objects allow you to request additional information as an expanded response by using the \`expand\` request parameter. This parameter is available on all API requests, and applies to the response of that request only. You can expand responses in two ways.

In many cases, an object contains the ID of a related object in its response properties. For example, a \`Charge\` might have an associated Customer ID. You can expand these objects in line with the expand request parameter. The \`expandable\` label in this documentation indicates ID fields that you can expand into objects.

Some available fields aren’t included in the responses by default, such as the \`number\` and \`cvc\` fields for the Issuing Card object. You can request these fields as an expanded response by using the \`expand\` request parameter.

You can expand recursively by specifying nested fields after a dot (\`.\`). For example, requesting \`payment_intent.customer\` on a charge expands the \`payment_intent\` property into a full PaymentIntent object, then expands the \`customer\` property on that payment intent into a full Customer object.

You can use the \`expand\` parameter on any endpoint that returns expandable fields, including list, create, and update endpoints.

Expansions on list requests start with the \`data\` property. For example, you can expand \`data.customers\` on a request to list charges and associated customers. Performing deep expansions on numerous list requests might result in slower processing times.

Expansions have a maximum depth of four levels (for example, the deepest expansion allowed when listing charges is \`data.payment_intent.customer.default_source\`).

You can expand multiple objects at the same time by identifying multiple items in the \`expand\` array.

- Related guide: [Expanding responses](https://docs.stripe.com/expand.md)
- Related video: [Expand](https://www.youtube.com/watch?v=m8Vj_CEWyQc)
{% right %}
\`\`\`Expand_Request
curl https://api.stripe.com/v1/charges/ch_3LmzzQ2eZvKYlo2C0XjzUzJV \
  -u sk_test_51TpNn5ChsAVzTaw...: \
  -d "expand[]"=customer \
  -d "expand[]"="payment_intent.customer" \
  -G
\`\`\`

\`\`\`Response
{
  "id": "ch_3LmzzQ2eZvKYlo2C0XjzUzJV",
  "object": "charge",
  "customer": {
    "id": "cu_14HOpH2eZvKYlo2CxXIM7Pb2",
    "object": "customer"
  },
  "payment_intent": {
    "id": "pi_3MtwBwLkdIwHu7ix28a3tqPa",
    "object": "payment_intent",
    "customer": {
      "id": "cus_NffrFeUfNV2Hib",
      "object": "customer"
    }
  }
}
\`\`\`
{% /right %}
{% /section %}

{% section id="idempotent-requests" title="Idempotent requests" %}
The API supports [idempotency](https://en.wikipedia.org/wiki/Idempotence) for safely retrying requests without accidentally performing the same operation twice. When creating or updating an object, use an idempotency key. Then, if a connection error occurs, you can safely repeat the request without risk of creating a second object or performing the update twice.

To perform an idempotent request, provide an additional \`IdempotencyKey\` element to the request options.

Stripe’s idempotency works by saving the resulting status code and body of the first request made for any given idempotency key, regardless of whether it succeeds or fails. Subsequent requests with the same key return the same result, including \`500\` errors.

A client generates an idempotency key, which is a unique key that the server uses to recognize subsequent retries of the same request. How you create unique keys is up to you, but we suggest using V4 UUIDs, or another random string with enough entropy to avoid collisions. Idempotency keys are up to 255 characters long. Avoid using sensitive data (for example, email addresses or personal identifiers) as idempotency keys.

You can remove keys from the system automatically after they’re at least 24 hours old. We generate a new request if a key is reused after the original is pruned. The idempotency layer compares incoming parameters to those of the original request and errors if they’re not the same to prevent accidental misuse.

We save results only after the execution of an endpoint begins. If incoming parameters fail validation, or the request conflicts with another request that’s executing concurrently, we don’t save the idempotent result because no API endpoint initiates the execution. You can retry these requests. Learn more about when you can [retry idempotent requests](https://docs.stripe.com/error-low-level.md#idempotency).

All \`POST\` requests accept idempotency keys. Don’t send idempotency keys in \`GET\` and \`DELETE\` requests because it has no effect. These requests are idempotent by definition.
{% right %}
\`\`\`Idempotent_cURL_Example
curl https://api.stripe.com/v1/customers \
  -u sk_test_51TpNn5ChsAVzTaw...: \
  -H "Idempotency-Key: KG5LxwFBepaKHyUD" \
  -d description="My First Test Customer (created for API docs at https://docs.stripe.com/api)"
\`\`\`
{% /right %}
{% /section %}

{% section id="include-dependent-response-values" title="Include-dependent values" %}
Some API v2 responses contain null values for certain properties by default, regardless of their actual values. That reduces the size of response payloads while maintaining the basic response structure. To retrieve the actual values for those properties, specify them in the \`include\` array request parameter.

To determine whether you need to use the \`include\` parameter in a given request, look at the request description. The \`include\` parameter’s enum values represent the response properties that depend on the \`include\` parameter.

## Note

Whether a response property defaults to null depends on the request endpoint, not the object that the endpoint references. If multiple endpoints return data from the same object, a particular property can depend on \`include\` in one endpoint and return its actual value by default for a different endpoint.

A hash property can depend on a single \`include\` value, or on multiple \`include\` values associated with its child properties. For example, when updating an Account, to return actual values for the entire \`identity\` hash, specify \`identity\` in the \`include\` parameter. Otherwise, the \`identity\` hash is null in the response. However, to return actual values for the \`configuration\` hash, you must specify individual configurations in the request. If you specify at least one configuration, but not all of them, specified configurations return actual values and unspecified configurations return null. If you don’t specify any configurations, the \`configuration\` hash is null in the response.

- Related guide: [Include-dependent response values](https://docs.stripe.com/api-includable-response-values.md)
{% right %}
\`\`\`Include_Request
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-06-24.preview" \
  --json '{
    "include": [
        "identity",
        "configuration.customer"
    ]
  }'
\`\`\`

\`\`\`Included_response_properties
{
  "id": "acct_123",
  "object": "v2.core.account",
  "applied_configurations": [
    "customer",
    "merchant"
  ],
  "configuration": {
    "customer": {
      "automatic_indirect_tax": {},
      "billing": {},
      "capabilities": {}
    },
    "merchant": null,
    "recipient": null
  },
  "contact_email": "furever@example.com",
  "created": "2025-06-09T21:16:03.000Z",
  "dashboard": "full",
  "defaults": null,
  "display_name": "Furever",
  "identity": {
    "business_details": {
      "doing_business_as": "FurEver",
      "id_numbers": [
        {
          "type": "us_ein"
        }
      ],
      "product_description": "Saas platform",
      "structure": "sole_proprietorship",
      "url": "http://accessible.stripe.com"
    },
    "country": "US"
  },
  "livemode": true,
  "metadata": {},
  "requirements": null
}
\`\`\`
{% /right %}
{% /section %}

{% section id="metadata" title="Metadata" %}
Updateable Stripe objects—including [Account](https://docs.stripe.com/api/accounts.md), [Charge](https://docs.stripe.com/api/charges.md), [Customer](https://docs.stripe.com/api/customers.md), [PaymentIntent](https://docs.stripe.com/api/payment_intents.md), [Refund](https://docs.stripe.com/api/refunds.md), [Subscription](https://docs.stripe.com/api/subscriptions.md), and [Transfer](https://docs.stripe.com/api/transfers.md) have a \`metadata\` parameter. You can use this parameter to attach key-value data to these Stripe objects.

You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long. Keys and values are stored as strings and can contain any characters with one exception: you can’t use square brackets ([ and ]) in keys.

You can use metadata to store additional, structured information on an object. For example, you could store your user’s full name and corresponding unique identifier from your system on a Stripe [Customer](https://docs.stripe.com/api/customers.md) object. Stripe doesn’t use metadata—for example, we don’t use it to authorize or decline a charge and it won’t be seen by your users unless you choose to show it to them.

Some of the objects listed above also support a \`description\` parameter. You can use the \`description\` parameter to annotate a charge-for example, a human-readable description such as \`2 shirts for test@example.com\`. Unlike \`metadata\`, \`description\` is a single string, which your users might see (for example, in email receipts Stripe sends on your behalf).

Don’t store any sensitive information (bank account numbers, card details, and so on) as metadata or in the \`description\` parameter.

- Related guide: [Metadata](https://docs.stripe.com/metadata.md)

## Sample metadata use cases

- **Link IDs**: Attach your system’s unique IDs to a Stripe object to simplify lookups. For example, add your order number to a charge, your user ID to a customer or recipient, or a unique receipt number to a transfer.
- **Refund papertrails**: Store information about the reason for a refund and the individual responsible for its creation.
- **Customer details**: Annotate a customer by storing an internal ID for your future use.
{% right %}
\`\`\`Metadata_Request
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>" \
  -d "metadata[order_id]=6735"
\`\`\`

\`\`\`json
{
  "id": "cus_123456789",
  "object": "customer",
  "address": {
    "city": "city",
    "country": "US",
    "line1": "line 1",
    "line2": "line 2",
    "postal_code": "90210",
    "state": "CA"
  },
  "balance": 0,
  "created": 1483565364,
  "currency": null,
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": null,
  "invoice_prefix": "C11F7E1",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {
    "order_id": "6735"
  },
  "name": null,
  "next_invoice_sequence": 1,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none"
}
\`\`\`
{% /right %}
{% /section %}

{% section id="pagination" title="Pagination" %}
All top-level API resources have support for bulk fetches through “list” API methods. For example, you can [list charges](https://docs.stripe.com/api/charges/list.md), [list customers](https://docs.stripe.com/api/customers/list.md), and [list invoices](https://docs.stripe.com/api/invoices/list.md). These list API methods share a common structure and accept, at a minimum, the following three parameters: \`limit\`, \`starting_after\`, and \`ending_before\`.

Stripe’s list API methods use cursor-based [pagination](https://docs.stripe.com/pagination.md) through the \`starting_after\` and \`ending_before\` parameters. Both parameters accept an existing object ID value (see below) and return objects in reverse chronological order. The \`ending_before\` parameter returns objects listed before the named object. The \`starting_after\` parameter returns objects listed after the named object. These parameters are mutually exclusive. You can use either the \`starting_after\` or \`ending_before\` parameter, but not both simultaneously.

Our client libraries offer [auto-pagination helpers](https://docs.stripe.com/pagination.md#auto-pagination) to traverse all pages of a list.

## Parameters

- **limit** *(optional, default is 10)*: This specifies a limit on the number of objects to return, ranging between 1 and 100.
- **starting_after** *(optional object ID)*: A cursor to use in pagination. \`starting_after\` defines your place in the list. For example, if you receive 100 objects ending with \`obj_foo\`, your subsequent call can include \`starting_after=obj_foo\`.
- **ending_before** *(optional object ID)*: A cursor to use in pagination. \`ending_before\` defines your place in the list.

## List Response Format

- **object** *(string, value is "list")*: A string that provides a description of the object type that returns.
- **data** *(array)*: An array containing the actual response elements.
- **has_more** *(boolean)*: Whether or not there are more elements available after this set.
- **url** *(url)*: The URL for accessing this list.

## v2 API pagination

APIs within the \`/v2\` namespace contain a different [pagination](https://docs.stripe.com/api-v2-overview.md#list-pagination) interface than the \`v1\` namespace.
{% right %}
\`\`\`Paginated_List_Response
{
  "object": "list",
  "url": "/v1/customers",
  "has_more": false,
  "data": [
    {
      "id": "cus_4QFJOjw2pOmAGJ",
      "object": "customer",
      "address": null,
      "balance": 0,
      "created": 1405641735,
      "currency": "usd",
      "default_source": "card_14HOpG2eZvKYlo2Cz4u5AJG5",
      "delinquent": false,
      "description": "New customer",
      "discount": null,
      "email": null,
      "invoice_prefix": "7D11B54",
      "invoice_settings": {
        "custom_fields": null,
        "default_payment_method": null,
        "footer": null,
        "rendering_options": null
      },
      "livemode": false,
      "metadata": {
        "order_id": "6735"
      },
      "name": "cus_4QFJOjw2pOmAGJ",
      "next_invoice_sequence": 25,
      "phone": null,
      "preferred_locales": [],
      "shipping": null,
      "tax_exempt": "none",
      "test_clock": null
    }
  ]
}
\`\`\`
{% /right %}
{% /section %}

{% section id="search" title="Search" %}
Some top-level API resource have support for retrieval via “search” API methods. For example, you can [search charges](https://docs.stripe.com/api/charges/search.md), [search customers](https://docs.stripe.com/api/customers/search.md), and [search subscriptions](https://docs.stripe.com/api/subscriptions/search.md).

Stripe’s search API methods utilize cursor-based pagination via the \`page\` request parameter and \`next_page\` response parameter. For example, if you make a search request and receive \`"next_page": "pagination_key"\` in the response, your subsequent call can include \`page=pagination_key\` to fetch the next page of results.

Our client libraries offer [auto-pagination](https://docs.stripe.com/api/pagination/auto.md) helpers to easily traverse all pages of a search result.

## Search request format

- **query** *(required)*: The search query string. See [search query language](https://docs.stripe.com/search.md#search-query-language).
- **limit** *(optional)*: A limit on the number of objects returned (1 to 100). Default is 10.
- **page** *(optional)*: A cursor for pagination. Use the \`next_page\` value returned in a previous response.

## Search response format

- **object** *(string, value is "search_result")*: A string describing the object type returned.
- **url** *(string)*: The URL for accessing this list.
- **has_more** *(boolean)*: Whether or not there are more elements available after this set.
- **data** *(array)*: An array containing the actual response elements.
- **next_page** *(string)*: A cursor for use in pagination.
- **total_count** *(optional positive integer or zero)*: The total number of objects that match the query, only accurate up to 10,000.
{% right %}
\`\`\`Search_Response_Example
{
  "object": "search_result",
  "url": "/v1/customers/search",
  "has_more": false,
  "data": [
    {
      "id": "cus_4QFJOjw2pOmAGJ",
      "object": "customer",
      "address": null,
      "balance": 0,
      "created": 1405641735,
      "currency": "usd",
      "default_source": "card_14HOpG2eZvKYlo2Cz4u5AJG5",
      "delinquent": false,
      "description": "someone@example.com for Coderwall",
      "discount": null,
      "email": null,
      "invoice_prefix": "7D11B54",
      "invoice_settings": {
        "custom_fields": null,
        "default_payment_method": null,
        "footer": null,
        "rendering_options": null
      },
      "livemode": false,
      "metadata": {
        "foo": "bar"
      },
      "name": "fakename",
      "next_invoice_sequence": 25,
      "phone": null,
      "preferred_locales": [],
      "shipping": null,
      "tax_exempt": "none",
      "test_clock": null
    }
  ]
}
\`\`\`
{% /right %}
{% /section %}

{% section id="auto-pagination" title="Auto-pagination" %}
Our libraries support auto-pagination. This feature allows you to easily iterate through large lists of resources without having to manually perform the requests to fetch subsequent pages.

Since curl simply emits raw HTTP requests, it doesn’t support auto-pagination.

Since the CLI simply emits raw HTTP requests, it doesn’t support auto-pagination.

To use the auto-pagination feature in server-side languages (Ruby, Python, PHP, Node.js, Go, .NET), simply use auto-paging iterators or async for loops as described in the documentation.
{% right %}
### Auto-pagination Warning

\`\`\`sh
# The auto-pagination feature is specific to Stripe's
# libraries and cannot be used directly with curl.
\`\`\`
{% /right %}
{% /section %}

{% section id="request-ids" title="Request IDs" %}
Each API request has an associated request identifier. You can find this value in the response headers, under \`Request-Id\`. You can also find request identifiers in the URLs of individual request logs in your [Dashboard](https://dashboard.stripe.com/logs).

To expedite the resolution process, provide the request identifier when you contact us about a specific request.
{% right %}
### Request ID Example

\`\`\`sh
curl https://api.stripe.com/v1/customers \
  -u sk_test_51TpNn5ChsAVzTaw...: \
  -D "-" \
  -X POST
\`\`\`
{% /right %}
{% /section %}

{% section id="connected-accounts" title="Connected Accounts" %}
If you use Stripe [Connect](https://docs.stripe.com/connect.md), you can issue requests on behalf of your [connected accounts](https://docs.stripe.com/connect/accounts.md). To act as a connected account, include a \`Stripe-Account\` header containing the connected account ID, which typically starts with the \`acct_\` prefix.

The connected account ID is set per-request. Methods on the returned object reuse the same account ID.

- Related guide: [Making API calls for connected accounts](https://docs.stripe.com/connect/authentication.md)
{% right %}
### Connected Account Request

\`\`\`sh
curl https://api.stripe.com/v1/charges/ch_3LmjFA2eZvKYlo2C09TLIsrw \
  -u sk_test_51TpNn5ChsAVzTaw...: \
  -H "Stripe-Account: acct_1032D82eZvKYlo2C" \
  -G
\`\`\`
{% /right %}
{% /section %}

{% section id="versioning" title="Versioning" %}
Each major release, such as [Acacia](https://docs.stripe.com/changelog/acacia.md), includes changes that aren’t [backward-compatible](https://docs.stripe.com/upgrades.md#what-changes-does-stripe-consider-to-be-backward-compatible) with previous releases. Upgrading to a new major release can require updates to existing code. Each monthly release includes only backward-compatible changes, and uses the same name as the last major release. The current version is 2026-06-24.dahlia. For information on all API versions, view our [API changelog](https://docs.stripe.com/changelog.md).

By default, requests made with curl use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)) unless you override it by setting the \`Stripe-Version\` header.

Webhook events also use your account’s API version by default, unless you set an API version during [endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md).

By default, requests made with the Stripe CLI use your account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)) unless you override it with the \`stripe-version\` argument.

You can [override the API version](https://docs.stripe.com/sdks/set-version.md) in your code in all versions.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)).

You can upgrade your API version in [Workbench](https://dashboard.stripe.com/workbench). As a precaution, use API versioning to test a new API version before committing to an upgrade.
{% right %}
### Version Notes

- **Ruby/Python/PHP/Java/Node/Go/.NET** fixing patterns follow automatic version locks in modern SDKs.
- Webhook events are resolved against version settings defined at endpoint creation.

> **Precautions**
> Utilize API versioning headers to test new integrations before executing dashboard upgrades.
{% /right %}
{% /section %}
`;

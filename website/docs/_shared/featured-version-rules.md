<!-- Shared snippet: the rules that pick a product's featured version, also the version filter values.
     Used by: ayon/web-ui/production-tracking/products.md, pipeline/loader.md -->

| Rule | Value in URIs and the API | The version it picks |
|---|---|---|
| **Latest** | `latest` | The most recently published version of the product, by publish order rather than version number. The hero version is not counted. |
| **Latest Done** | `latestDone` | The most recently published version whose status has the **Done** [state](../ayon/web-ui/project/anatomy.md#status-state), such as Approved. A product without such a version has none. |
| **Hero** | `hero` | The version the [hero version](../ayon/glossary/index.md) was copied from, marked with a star. A product without a hero version has none. |

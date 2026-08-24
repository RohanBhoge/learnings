## 1. Metadata in Next JS

- Use the following function provided by the next js to change the Metadata in deffrent pages in the project.

  ```js
  export async function generateMetadata() {
    return {
      title: "Test Page",
      description: "This is a test page",
    };
  }
  ```

- It automaticaly changes Title and Description as we jump on that page.

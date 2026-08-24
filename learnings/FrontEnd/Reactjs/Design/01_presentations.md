## Summary of Differences

| Feature             | Presentational ("Dumb") Components | Container ("Smart") Components        |
| ------------------- | ---------------------------------- | ------------------------------------- |
| **Primary Purpose** | How things look (UI)               | How things work (Logic)               |
| **Data Source** | Receives data via `props`          | Manages its own data, fetches from APIs |
| **State Management**| Usually stateless                  | Stateful, uses `useState`, `useEffect`  |
| **Reusability** | High                               | Low                                   |
| **Example** | `Button`, `UserCard`, `Modal`      | `UserProfile`, `ProductList`, `LoginForm` |
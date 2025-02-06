### Overview

**😻 Hey cat lover! This three-page React app lets you explore adorable random cat images and learn all about their breeds. With dedicated modal views for images and breeds, and a favourites feature to save your cutest finds, this app is purr-fect for you!**

**The first page** displays 12 images with an option to load more. You can favourite or share any image. Clicking on an image opens a modal with an enlarged view, and a link to the breed page's details modal if a breed is available.

**The second page** lets you browse all cat breeds, and clicking on a breed opens a modal with details and a few breed images, if they exist. Each image links back to the images page, opening the image's modal. If images exist, there is also a button that leads to the images page, filtering by breed, along with a list of tags where you can remove the selected breed.

**The third page** displays all your favourite cats, with the option to remove any or clear all. If you accidentally remove a favourite, don't worry - it won’t disappear instantly. Your favourites persist, even after reloading the page.

The app uses data fetched from the [CAT API](https://developers.thecatapi.com/). It uses **TypeScript** for type safety, **Redux** for state management, **React Router** for handling navigation, **React Query** for fetching and caching the external data and **Jest** for testing. It follows a mobile-first design approach with custom styling.


-----

### Project Setup

#### Installation

To install dependencies, assuming you already have Node installed (tested with Node v20.12.0), run:

```
npm install
```

#### Running

**Running the app locally:** (should auto-open on `http://localhost:8080/`)

```
npm run dev
```

**Running Tests:**

```
npm run test
```

#### Linting

Using ESLint for code quality checks and Prettier for code formatting, it also includes import sorting to automatically arrange imports in a consistent order. To check run:

```
npm run lint
```

and to auto-fix fixable issues run:

```
npm run lint:fix
```

-----

### Project Structure

To help better understand the codebase, detailed comments are included throughout the components and modules. In addition to documenting the components, some choices worth mentioning are marked by `NOTES:`, while ideas for potential improvements are marked under `Future enhancements:`. Apart from helping understand how each part works, this documentation aims to offer perspective on some choices or thoughts I wouldn't have had the time to complete within the time limit of this assignment.

#### Component Organization

###### 1. Reusable UI Components:
The app is built with several reusable UI components located under `/src/components/ui`. These components include:

- **FavouriteButton:** Displays a heart icon that switches between filled and outlined based on the favourite state and allows changing it on click.
- **Loading Grid:** A skeleton loader for a grid layout with a specified number of placeholder elements.
- **Load More Button:** Button for fetching more, with dynamic text and disabled state based on whether there are more items to load or a loading process is active.
- **Share Button:** Used for sharing a link using the Web Share API on mobile devices or clipboard copying as a fallback.
- **Toast message:** Floating message that automatically disappears after a short period of time.
- **Tag List:** Displays a list of tags with a title and a remove button next to each tag and allows removing individual tags.


###### 2. Layout Components:
The layout components are placed under `/src/components/layout` and are used across the app. These include:

- **Header** with its **Navigation**, and **Footer** that wrap the main layout.

###### 3. Shared components:
These reusable components, located under `/src/components/shared`, are used across the app and handle app-specific ontent-related functionality.

- **Breed Details:** Detailed information about a cat breed, with the option to show a full or short version.

- **Empty Section:** Displays custom messages when a section is empty, such as when no cats or favourites are available, showing the relevant message based on the type.

- **Image Card:** A flexible image component that displays images with optional actions like favouriting, sharing and clicking, and optional caption, managing its own image loading and fallback state.


###### 4. Page-specific
The core functionality of the app is centralized in the individual pages components, located under `/src/components/pages`, where each page's data fetching, centralized state and layout are managed.

- These include the **ImagesPage**, **BreedsPage**, **FavouritesPage** and a **NotFoundPage**.


###### 5. Modals
Modals are grouped together under `/src/components/Modal`, providing a base modal component and wrapper modals for specific use cases.

- **Modal:** A portalized modal that accepts a header and displays dynamic content, shown as drawer on mobile.
- **Image Modal** and **Breed Modal** that manage image or breed specific data before passing them to the UI components they wrap.


#### Optimisations & Testing
- **Data fetching:** Data fetching is optimized using TanStack Query to minimize unnecessary requests. Caching is leveraged to ensure that images and other data are retrieved once and reused. For instance, when navigating between pages or opening modals, the app checks the cache to avoid refetching already available data, for a smoother experience.
- **Custom hooks:** Logic for data fetching, modal state, favourite state and breed filtering is moved into custom hooks. Although they are not reused in the scope of this small app, the separation was made to simplify the components and promote future reusability.
- **Memoisation:** Components like the Share and Favourite buttons and Breed Details, the props of which are not expected to change frequently but may be part of elements that rerender often, are memoized to skip unnecessary rerenders.
- **Testing:** Tests were added for some components, prioritising those with central roles and higher complexity due to time limitations. The tests focus on basic scenarios and include one of the pages (breeds), the image card and the base Modal component.


Hope you enjoy using this app as much as a cat enjoys knocking things off tables! 😸

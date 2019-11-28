Intro to React Hooks https://git.generalassemb.ly/SEI-CC/SEI-CC-4/blob/master/work/w11/d2/02-intro-to-react-hooks/intro-to-react-hooks.md
Learning Objectives
Students Will Be Able To:
Explain the use case (what & why) of hooks
Use the useState hook to use state in function components
Use the useEffect hook to perform "side effects" in function components
Road Map
Intro
Set Up
Review the Starter Code
Why use React Hooks?
What are Hooks?
Using Hooks
Rules of Using Hooks
Essential Questions
Further Study
Intro
Hooks are an exciting addition to React versions 16.8+.

This lesson will cover the use case of hooks and demonstrate how to use the two most common React hooks.

Set Up
To get set up for this lesson:

cd into the starter-code/react-hooks folder for this lesson.
Open the project in VS Code: $ code .
Open a terminal in VS Code (ctrl + backtick)
Install the Node modules: $ npm i
Start the React Dev Server: $ npm start
Once the app is open, your browser will show something like the following, depending upon the current level of your battery and whether your computer is charging or not:



When charging:



Review the Starter Code
The starter code for this lesson includes a <BatteryContainer> class component that holds the device's battery charge level & charging status in state.

In addition, <BatteryContainer> uses lifecycle methods to register/unregister with a reusable utils/battery.js module designed to notify other modules (observers) when the device's battery charge level or charging status changes.

Why use React Hooks?
Fact: Hooks don't bring add any additional functionality in React applications.

So, if hooks don't bring any new features to React apps, one might wonder why they've been added to the library.

The short answer is that hooks enable function components to use the capabilities of class components.

Capabilities such as the ability to:

Remember and update state.
Run code in a way similar to using lifecycle methods.
IMPORTANT: Hooks are backward-compatible and can be used side-by-side with classes and existing code so you can start using them gradually when you feel the urge to do so.

So, what's wrong with class components?
There's nothing "wrong" with class components. However, consider that:

Most developers find class components more complex to write and grasp than function components.
With function components, there's no need to be concerned about the proper binding of this in event handlers, etc.
Equivalent function components are more concise than their class counterparts.
Functions aren't just easier on human developers, they're also easier for tooling and testing.
Additional benefits of hooks
Just a few of the additional benefits hooks include:

Hooks allow complex components to be split into smaller functions.
The functionality in hooks are reusable across multiple components.
Hooks allow related, stateful behavior to be kept together instead of being spread across multiple class methods such as componentDidMount, componentDidUpdate & componentWillUnmount.
Custom hooks can be written and shared across projects and with the community.
What are Hooks?
Specifically, a hook:

Is a JavaScript function.
Can only be used within function components.
Allows function components to "remember" state and stateful behavior between renders.
Built-in Hooks and their use cases:
Hook	Use Case
useState()	Used to implement class components' this.state and setState().
useEffect()	Used to implement "side effects", e.g., fetching data, using timers, subscriptions, etc.
useEffect() implements the functionality of componentDidMount, componentDidUpdate & componentWillUnmount with a single hook!
useRef()	In addition to how refs are used to access DOM elements in class components, useRef() can be used more generally to "remember" any non-state data that needs to be persisted between renders similar to how we use instance properties in class components.
useReducer()	An alternative to useState() for when the state is more complex. It uses a reducer function and "actions" to update state - similar to how Redux does (but not as comprehensive).
Other built-in hooks	useContext()
useMemo()
and other less common hooks here...
Using Hooks
We're going to use hooks in our starter app to build another component that implements the same behavior as the existing <BatteryContainer> component.

muscle Practice Exercise (5 mins)
Create a new <BatteryHookContainer> function component following best practices.

For now, simply render a <p> React element containing the text "BatteryHookContainer".

In App.js, import the new component and update the render() method to include <BatteryHookContainer> below the existing <BatteryContainer>.

When complete, the screen should look something like this:



Adding State Using useState()
We use the useState() hook to add a piece of state to a function component.

We invoke useState() and provide the initial value for the piece of state as an argument.

useState() returns an array with two elements, the value and a setter function used to update the value.

We know we will want to track the battery's level, so let's start with that:

// Update the import to include the useState hook
import React, {useState} from "react";
// Import the Battery component used for visualization
import Battery from "../Battery/Battery";

function BatteryHookContainer() {
  // useState always returns an array of two elements
  const arr = useState(.55);
  // First element is the value of the state
  const level = arr[0];
  // Second element is a setter function for updating the state
  const setLevel = arr[1];
  return (
    <Battery level={level} />
  );
}
Key Point: The names of the variables that hold the state value and setter function are up to us. However, it's convention to name the setter function by prepending set to the name of the state variable as we did with level & setLevel.

Nice...



Now let's add a <button> to test out the setter function (don't forget to add the React Fragment):

  ...
  return (
    <>
      <Battery level={level} />
      <button onClick={() => setLevel(level + .01)}>Update Level</button>
    </>
  );
Cool it works! Also note how easily we can use the current value of level in the level + .01 expression - no need to worry about providing a function to setState() in class components.

IMPORTANT: Unlike using setState() in class components which merges two objects, calling the setter function replaces the current state value with the argument provided.

muscle Practice Exercise (1 min)
It's cleaner and more common to destructure the array returned by useState().

Using destructuring assignment, refactor the following three lines of code:

  const arr = useState(.55);
  const level = arr[0];
  const setLevel = arr[1];
Into a single line of code.

While we're at it, let's get rid of the <button> and React Fragment.

Adding Additional State
useState() can be called as many times as necessary to create more state.

For example, we could add another useState() call to create the charging state like this (don't type the following):

  const [level, setLevel] = useState(.55);
  // Add additional state by calling useState multiple times 
  const [charging, setCharging] = useState(false);
However, since a piece of state can be any data type, including an object, it would be beneficial to group related state together when it is typically updated at the same, or accessed as a whole, e.g., the state for a form.

Looking at <BatteryContainer>, we see that both level and charging are being updated simultaneously using the updateBattery() method.

Since it would make sense to be able to call a single setter function instead of making two calls when updating the status of the battery, it makes sense to group level and charging together as follows:

function BatteryHookContainer() {
  // Initialize batteryData to an object with level & charging properties
  const [batteryData, setBatteryData] = useState({
    level: .55,
    charging: true
  });
  return (
    {/* Update as follows */}
    <Battery level={batteryData.level} charging={batteryData.charging}/>
  );
}
We'll be using the setBatteryData() setter function to update the battery's status in the next section where we start using the useEffect() hook...

Performing Side Effects Using useEffect()
Side effects include performing tasks such as:

Fetching data
Using timers
Manually updating the DOM
Managing subscriptions - as is currently being done by the <BatteryContainer> class component using lifecycle methods
Key Point: When performing a task in a class component that requires overriding componentDidMount, componentDidUpdate, and/or componentWillUnmount, an equivalent function component will require a useEffect() hook. Amazingly though, a single useEffect() hook can replace those three lifecycle methods combined!

Adding the useEffect() Hook
Like useState() and other hooks, because they are functions, we just invoke them from the top-level of the function component:

// Update the import to include useEffect
import React, {useState, useEffect} from "react";

function BatteryHookContainer() {
  const [batteryData, setBatteryData] = useState({
    level: .55,
    charging: true
  });

  useEffect(() => {
    console.log('useEffect was called');
  });
  
  ...
}
useEffect() takes a callback function as its first and only required argument.

By default, the effect's callback function is going be invoked after every render of the component.

Note: In class components, we would have to implement the componentDidUpdate() lifecycle method to run a side effect every render after the initial render.

Let's observe this by adding back that button that calls the setBatteryData() setter function - go ahead and copy/paste it:

  return (
    <>
      <Battery level={batteryData.level} charging={batteryData.charging}/>
      <button onClick={() => setBatteryData({level: batteryData.level + .01, charging: false})}>
        Update Level
      </button>
    </>
  );
Clicking the button will result in the effect running after each render (when the DOM is updated by React).

Preventing Side Effects from Running
In many cases, you will want to optimize the component so that side effects only run if:

Certain data changes (typically a prop or state variable).
After the initial render, but not after subsequent renders (as with componentDidMount in class components).
The useEffect() hook provides for these scenarios by accepting an array as a second argument.

The array is designed to hold a list of dependencies, that is, a list of variables and/or object properties that causes the side effect to run only if at least one of the dependencies change their value.

Providing an empty array ([]), will result in the side effect only running after the initial render. Let's check this out:

  // Add the [] as a 2nd argument
  useEffect(() => {
    console.log('useEffect was called');
  }, []);
Clear the console and refresh. The "useEffect was called" message will be logged. However, unlike without the [] arg, clicking the button will no longer run the side effect!

Registering with the battery.js Module
The time has come to register with the battery.js module in <BatteryHookContainer> so that it can be notified when the battery's status changes.

First let's import battery.js in the same way <BatteryContainer> is doing:

import React, {useState, useEffect} from "react";
import Battery from "../Battery/Battery";
// Add the import below
import {register, unregister} from '../../utils/battery';
As you can see, there's register and unregister named exports which are functions we use to register for notifications when the component mounts (after the first render only), and unregister when the component is going to unmount.

We already have a useEffect() hook written that runs only once - just what we need to register for battery notifications:

  useEffect(() => {
    register(updateBattery);
    console.log('useEffect was called');
  }, []);
The register function accepts a callback function that the battery.js module will call whenever the battery's status changes; and when it does, it will pass as an arg to the callback a data object with this shape:

{
  level: battery.level,
  charging: battery.charging
}
That data object just happens to have the exact property names as the batteryData state - perfect!

muscle Practice Exercise - Code the updateBattery Function (5 mins)
Stub up updateBattery as a function nested within the BatteryHookContainer function.

It will need a single parameter to accept the battery status object shown above.

Add the line of code that will update the batteryData state.

Once again, remove the <button> and React Fragment from the JSX.

When completed, the <BatteryHookContainer> function component will be working just like <BatteryContainer>:



Well, almost - we still need to be good developers and unregister with the battery.js module whenever <BatteryHookContainer> is going to be removed from the DOM...

Cleaning Up Side Effects
Certain side effects need to "clean up" after themselves and others don't.

For example, a side effect that fetches data, has nothing to clean up - it fetches data, updates state with it, and that's it.

However, in the case of say, creating a timer, or using subscriptions, you'll want to clear that timer or unsubscribe when the component that created it no longer exists.

Cleaning up is a good development practice because it prevents memory leaks.

In our Battery app, we registered a callback function with the battery.js module. Because a reference to that function is being held in the observerCallsbacks array, the callback function will not be marked for garbage collection even after the <BatteryHookContainer> component ceases to exist causing a memory leak.

In a class component, we use the componentWillUnmount() lifecycle method to clean up side effects.

However, a useEffect() hook can also run a cleanup process by returning a "cleanup" function from the hook's function:

  useEffect(() => {
    register(updateBattery);
    // Return a "cleanup" function
    return () => {
      unregister(updateBattery);
    };
  }, []);
Using that empty array as a second argument results in the cleanup function running once - when the component unmounts.

Here's a summary of when side effects and their cleanup functions run according to what is passed as a second argument:

Second Arg	When Effect and Cleanup Functions Run
none	Effect fn: Runs after every render.
Cleanup fn: Runs just before then next render to cleanup the previous render's effects.
[]	Effect fn: Runs once after initial render (mounting).
Cleanup fn: Runs once before unmounting.
[depVar, obj.depProp, ...]	Effect fn: Runs once after initial render, then only when either depVar, obj.depProp, etc. changes.
Cleanup fn: Runs before next render if previous render ran the effect and also when unmounting.
Summary
Both the <BatteryHookContainer> and <BatteryContainer> are now functionally equivalent.

Comparing the code may tempt you to write only function components in future projects blush

Rules of Using Hooks
Using hooks requires that we always follow these two rules:

Only call hooks at the top-level of a function component. Calling hooks inside loops, conditions, or nested functions is not allowed.

Only call hooks from within:

React function components (they don't work with class components)
Or, your own custom Hooks
question Essential Questions
True or False: React hooks allow function components to use React features previously possible only in class components?

The ________ hook allows function components to manage state.

Give one example of when to use the useEffect() hook.

Further Study
Custom Hooks
Building your own custom hooks enables extracting logic out of function components and into reusable functions (hooks) - just like what we saw with useState() and useEffect().

The key word in the above description is reusable. If you find that you've written components that include duplicate logic, a custom hook can be used to make components more DRY!

A custom hook is a JavaScript function whose name starts with use (by highly recommended convention).

Custom hooks may call other hooks such as useState(), etc.

For an example, and to learn more, start by checking out Building Your Own Hooks in the docs.

References
React Docs - Introducing Hooks

React Docs - Hooks API Reference

React Docs - Building Your Own Hooks

MDN - Battery Status API

Observer Design Pattern





This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

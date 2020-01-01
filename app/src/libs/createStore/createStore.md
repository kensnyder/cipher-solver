## createStore function

Create a store for consuming and setting state

## Example usage

In `pages/MyPage/store/myPageStore.js`:

```js
import createStore from '../../../libs/createStore/createStore.js';
// create store with initial state
const { StoreProvider, useStore } = createStore({
    // initial state
    sum: 0,
    foo: 'bar',
});
// export the provider HOC
export const MyProvider = StoreProvider;
// define a hook function that returns some state and some state changer function(s)
export function useAdder() {
    const [state, setState] = useStore();
    return {
        sum: state.sum,
        add: operand => {
            setState(old => ({ ...old, sum: old.sum + operand }));
        },
    };
}
// or a hook that just returns state
export function useFoo() {
    const [state] = useStore();
    return state.foo;
}
// or a hook that just returns a state changer function
export function useMultiplier() {
    const [, setState] = useStore();
    return operand => {
        setState(old => ({ ...old, sum: old.sum * operand }));
    };
}
```

And then in `pages/MyPage/MyPage.js`:

```jsx harmony
import React from 'react';
import { MyProvider } from './store/myPageStore.js';
import { MyPageThing1 } from './components/MyPageThing1/MyPageThing1.js';
import { MyPageThing2 } from './components/MyPageThing2/MyPageThing2.js';

export default function MyPage() {
    return (
        <div className="Component Page MyPage">
            <MyProvider>
                <MyPageThing1 />
                <MyPageThing2 />
            </MyProvider>
        </div>
    );
}
```

And then in `pages/MyPage/components/MyPageThing1/MyPageThing1.js`:

```jsx harmony
import React from 'react';
import { useAdder, useFoo, useMultiplier } from '../../store/myStore.js';

export default function MyPageThing1() {
    const { sum, add } = useAdder();
    const foo = useFoo();
    const multiply = useMultiplier();
    return (
        <div className="buttons">
            <h1>Foo is {foo}</h1>
            <h2>Sum is {sum}</h2>
            <button onClick={() => add(1)}>+ 1</button>
            <button onClick={() => add(2)}>+ 2</button>
            <button onClick={() => multiply(7)}>x 7</button>
        </div>
    );
}
```

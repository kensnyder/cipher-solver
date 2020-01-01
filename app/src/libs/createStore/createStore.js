import React, { useState, useDebugValue, useMemo, useContext } from 'react';

export default function createStore(initialValue = {}) {
    // make a context for our store
    const Context = React.createContext([]);
    // make a provider
    const StoreProvider = ({ children }) => {
        // make a new state instance
        const [state, setState] = useState(initialValue);
        // make it debuggable
        useDebugValue(state);
        // memoize context to update when state does
        const contextValue = useMemo(() => [state, setState], [state]);
        // provide store to children
        return <Context.Provider value={contextValue}>{children}</Context.Provider>;
    };
    // a hook to consume the store
    const useStore = () => useContext(Context);
    // provide through HOC and use through hook
    return { StoreProvider, useStore };
}

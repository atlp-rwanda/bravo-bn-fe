import React from 'react'
import Counter from '../components/Counter'
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function Home() {
    return (
        <div className='homePage'>
            <h1>Welcome To Barefoot Normad </h1>
            <Provider store={store}>
                <Counter />
            </Provider>

        </div>
    );
}
import { Component } from "react";
import { Nav } from "./components";
import { HomePage, ItemPage } from "./pages";
import {Routes, Route} from 'react-router-dom';
import { NotFound } from "./pages/404";
import { RootWrap } from "./styled";
import './index.css';

class App extends Component {
    render() {
        return (
            <>
                <Nav />
                <RootWrap >
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="story/:storyId" element={<ItemPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </RootWrap>
            </>
        )
    }
}


export {
    App
}
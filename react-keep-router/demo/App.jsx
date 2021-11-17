import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu.jsx";
// import {KeepAliveScopeR,KeepAliveR} from 'react-keep-router';//发布包测试
import { KeepAliveR, KeepAliveScopeR } from '../src';//日常修改测试
import CounterView from "./Views/CounterView.jsx";
import PortalTest from "./Views/PortalTest.jsx";
import EffectTest from "./Views/EffectTest.jsx";
import ContextTest from "./Views/ContextTest.jsx";
import KeepRouteView from "./Views/KeepRouteView.jsx";
import './App.scss'

// console.log({KeepAliveScopeR,KeepAliveR})

const menuConfig = [
    { text: "无缓存组件", to: "/app/no-cache" },
    // {text:"portal-test",to:"/app/portal-test"},
    { text: "缓存组件测试", to: "/app/keep" },
    { text: "缓存组件副作用测试", to: '/app/effect-test' },
    { text: "多缓存组件测试", to: '/app/many-component-test' },
    { text: "缓存组件上下文测试", to: '/app/context-test' },
    {
        text: "路由缓存组件测试",
        children: Array.from(Array(4), (v, k) => {
            return {
                text: `路由测试页面${ k + 1 }`,
                to: `/app/keep-route/${ k + 1 }`
            }
        })
    }
]

export default function App() {
    return <ErrorBoundary>
        <KeepAliveScopeR>
            <Router>
                <div className="app">
                    <Menu config={ menuConfig }/>
                    <div className="content">
                        <Switch>
                            <Route path='/app/no-cache'><CounterView title='无缓存测试'/></Route>
                            <Route path='/app/portal-test'><PortalTest/></Route>
                            <Route path='/app/effect-test'>
                                <KeepAliveR cacheKey='/app/effect-test'>
                                    <EffectTest/>
                                </KeepAliveR>
                            </Route>
                            <Route path='/app/many-component-test'>
                                <KeepAliveR cacheKey='/app/many-component-test'>
                                    <EffectTest/>
                                    <EffectTest/>
                                    <EffectTest/>
                                </KeepAliveR>
                            </Route>
                            <Route path='/app/context-test' component={ ContextTest }/>

                            <Route path='/app/keep'>
                                <KeepAliveR cacheKey='/app/keep'>
                                    <CounterView title='keep'/>
                                </KeepAliveR>
                            </Route>

                            <Route path='/app/keep-route' component={ KeepRouteView }/>

                            <Route>Home</Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        </KeepAliveScopeR>
    </ErrorBoundary>
}

import { PureComponent, Fragment } from "react";

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch',error,errorInfo)
    }

    render() {
        if (this.state.error) return <pre style={ { color: 'red', whiteSpace: 'pre-wrap' } }>{ this.state.error.message }</pre>;
        return <Fragment>{ this.props.children }</Fragment>;
    }
}

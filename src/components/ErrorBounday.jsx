import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {appCrashed: false};
    }

    static getDerivedStateFromError() {
        return {appCrashed: true};
    }

    render() {
        if (this.state.appCrashed) {
            return (
                <div className='text-center'>
                    <h1 className='mt-5 font-semibold text-2xl'>Something went wrong :(</h1>
                    <button className='btn-primary max-w-xs mx-auto py-1 mt-5' onClick={() => window.location.href = "/"}>Reload</button>
                </div>
            );
        }

        return this.props.children;
    }
}
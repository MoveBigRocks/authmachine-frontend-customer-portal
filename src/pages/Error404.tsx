import React from 'react';
import {Helmet} from "react-helmet";
import { Result, Button } from 'antd';

class Error404 extends React.Component{
    render(){
        return (
            <div>
                <Helmet>
                    <title>Page not found</title>
                </Helmet>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        )
    }
}

export default Error404;
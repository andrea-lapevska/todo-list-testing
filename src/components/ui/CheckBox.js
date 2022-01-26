import React, {Component} from 'react';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            testid: this.props.testid
        };
    }

    handleChange(e) {
        const {checked} = e.target;

        this.setState({checked});
        this.props.onChange(checked);
    }

    render() {
        return (<input type="checkbox" checked={this.state.checked} data-testid={this.state.testid} onChange={this.handleChange.bind(this)}/>);
    }
}

export default CheckBox;

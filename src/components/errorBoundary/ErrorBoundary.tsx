
import { Component, ErrorInfo } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage';

type ErrorState = {
  error:boolean;
}

type Props = {
  children: JSX.Element
}

export default class ErrorBoundary extends Component<Props> {

  state: Readonly<ErrorState> = {
    error:false
  };

  constructor(props:Props){
    super(props);
  }

  componentDidCatch(){
    this.setState({error:true});
  }

  render() {
    if (this.state.error) return <ErrorMessage/>;

    return this.props.children;
  }
}

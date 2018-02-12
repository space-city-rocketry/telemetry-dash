import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactMapGL from 'react-map-gl';
import DeckGL, { LineLayer, ScatterplotLayer } from 'deck.gl';

import 'mapbox-gl/dist/mapbox-gl.css';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapStyle: 'mapbox://styles/mapbox/satellite-v9',
            follow: false,
            history: 100,
            mapboxApiAccessToken: '',
            viewport: {
                width: 400,
                height: 400,
                latitude: 32.990312,
                longitude: -106.975241,
                zoom: 13,
                pitch: 60,
                bearing: 0
            },
            data: [],
            segments: []
        };
        this.$parent = null;
    }

    componentDidMount() {
        this.$parent = ReactDOM.findDOMNode(this).parentElement;
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        this.props.socket.on('mapbox token', (mapbox_token) => {
            this.setState({ mapboxApiAccessToken: mapbox_token });
            console.log('received mapbox token', mapbox_token);
        });

        this.props.socket.on('gps data', (gps_data) => {
            const newData = [...this.state.data];
            newData.push(gps_data);
            if (newData.length > this.state.history) {
                newData.shift();
            }
            this.setState({ data: newData });

            if (newData.length > 2) {
                const sp = newData[newData.length - 2];
                const tp = gps_data;
                const newSegments = [...this.state.segments];
                newSegments.push({
                    sourcePosition: [sp.lon, sp.lat, sp.alt],
                    targetPosition: [tp.lon, tp.lat, tp.alt],
                    color: [255, 255, 255]
                });
                if (newSegments.length > this.state.history) {
                    newSegments.shift();
                }
                this.setState({ segments: newSegments });
            }

            if (this.state.follow) {
                this.setState({
                    viewport: {
                        ...this.state.viewport,
                        latitude: gps_data.lat,
                        longitude: gps_data.lon
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.$parent.offsetWidth,
                height: this.$parent.offsetHeight
            }
        });
    }

    render() {
        const lastDataPoint = this.state.data[this.state.data.length - 1];
        const layers = [
            new ScatterplotLayer({
                id: 'points',
                data: lastDataPoint ? [lastDataPoint] : [],
                radiusScale: 1,
                getPosition: d => [d.lon, d.lat, d.alt],
                getColor: d => [200, 16, 46],
                getRadius: d => 100
            }),
            new LineLayer({
                id: 'flight-path',
                data: this.state.segments,
                strokeWidth: 5
            })
        ];
        
        if (this.state.mapboxApiAccessToken === '') {
            return (<div/>);
        }

        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={this.state.mapStyle}
                onViewportChange={viewport => this.setState({ viewport })}
                mapboxApiAccessToken={this.state.mapboxApiAccessToken}
            >
                <DeckGL
                    {...this.state.viewport}
                    layers={layers}
                />
            </ReactMapGL>
        );
    }
}

Map.propTypes = {
    socket: PropTypes.any.isRequired
};

import { useCallback, useState, useEffect } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Fireworks = () => {
    const [showParticles, setShowParticles] = useState(true);

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowParticles(false);
        }, 5000); // Run for 5 seconds

        // Clean up function
        return () => clearTimeout(timer);
    }, []); // Empty array means this effect runs once when the component mounts.

    const style = {
        transition: 'opacity 3s ease-out',
        opacity: showParticles ? 1 : 0
    };

    return (
        <div style={style}>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                "name": "Fireworks",
                "fullScreen": {
                    "enable": true
                },
                "emitters": {
                    "direction": "top",
                    "life": {
                        "count": 0,
                        "duration": 0.1,
                        "delay": 0.1
                    },
                    "rate": {
                        "delay": 0.15,
                        "quantity": 0.5
                    },
                    "size": {
                        "width": 10,
                        "height": 0
                    },
                    "position": {
                        "y": 100,
                        "x": 50
                    }
                },
                "particles": {
                    "number": {
                        "value": 0
                    },
                    "destroy": {
                        "bounds": {
                            "top": 30
                        },
                        "mode": "split",
                        "split": {
                            "count": 1,
                            "factor": {
                                "value": 0.333333
                            },
                            "rate": {
                                "value": 100
                            },
                            "particles": {
                                "stroke": {
                                    "width": 0
                                },
                                "color": {
                                    "value": ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
                                },
                                "number": {
                                    "value": 0
                                },
                                "collisions": {
                                    "enable": false
                                },
                                "destroy": {
                                    "bounds": {
                                        "top": 0
                                    }
                                },
                                "opacity": {
                                    "value": {
                                        "min": 0.1,
                                        "max": 1
                                    },
                                    "animation": {
                                        "enable": true,
                                        "speed": 0.7,
                                        "sync": false,
                                        "startValue": "max",
                                        "destroy": "min"
                                    }
                                },
                                "shape": {
                                    "type": "circle"
                                },
                                "size": {
                                    "value": 2,
                                    "animation": {
                                        "enable": false
                                    }
                                },
                                "life": {
                                    "count": 1,
                                    "duration": {
                                        "value": {
                                            "min": 1,
                                            "max": 2
                                        }
                                    }
                                },
                                "move": {
                                    "enable": true,
                                    "gravity": {
                                        "enable": true,
                                        "acceleration": 9.81,
                                        "inverse": false
                                    },
                                    "decay": 0.1,
                                    "speed": {
                                        "min": 10,
                                        "max": 25
                                    },
                                    "direction": "outside",
                                    "random": true,
                                    "straight": false,
                                    "outModes": "destroy"
                                }
                            }
                        }
                    },
                    "life": {
                        "count": 1
                    },
                    "shape": {
                        "type": "line"
                    },
                    "size": {
                        "value": {
                            "min": 10,
                            "max": 50
                        },
                        "animation": {
                            "enable": true,
                            "sync": true,
                            "speed": 90,
                            "startValue": "max",
                            "destroy": "min"
                        }
                    },
                    "stroke": {
                        "color": {
                            "value": "#ffa500"
                        },
                        "width": 4
                    },
                    "rotate": {
                        "path": true
                    },
                    "move": {
                        "enable": true,
                        "gravity": {
                            "acceleration": 15,
                            "enable": true,
                            "inverse": true,
                            "maxSpeed": 100
                        },
                        "speed": {
                            "min": 10,
                            "max": 20
                        },
                        "outModes": {
                            "default": "destroy",
                            "top": "none"
                        },
                        // "trail": {
                        //     "fillColor": "#000",
                        //     "enable": true,
                        //     "length": 10
                        // }
                    }
                },
                "sounds": {
                    "enable": true,
                    "events": [
                        {
                            "event": "particleRemoved",
                            "filter": "explodeSoundCheck",
                            "audio": [
                                "https://particles.js.org/audio/explosion0.mp3",
                                "https://particles.js.org/audio/explosion1.mp3",
                                "https://particles.js.org/audio/explosion2.mp3"
                            ]
                        }
                    ],
                    "volume": 50
                }
            }}
        />
        </div>
    ) ;
};

export default Fireworks;
export type TagNode = {
  [tag: string]: TagNode;
};

const hierarchy: TagNode = {
  "Programming Languages & Frameworks": {
    "Low-level Programming Language": {
      C: {},
      "C++": {},
      Rust: {}
    },
    "High-level Programming Language": {
      Python: {},
      TypeScript: {},
      JavaScript: {},
      Java: {},
      Go: {},
      Kotlin: {},
      Swift: {},
      "C#": {},
      MATLAB: {}
    },
    "Frameworks": {
      React: {},
      Vue: {},
      NextJS: {},
      Django: {},
      Flask: {},
      Android: {}
    },
    "Compilers and more": {
      LLVM: {},
      "WebAssembly": {},
      "GCC": {},
      "Clang": {},
      "TypeScript Compiler": {},
      "JIT": {},
      "CMake": {},
      "Numba": {}
    }
  },

  "Machine Learning & Deep Learning": {
    "Frameworks": {
      TensorFlow: {},
      "PyTorch": {},
      Keras: {},
      JAX: {},
      "scikit-learn": {},
      "scikit-image": {},
      "OpenCV": {},
      "Hugging Face": {},
      "spaCy": {},
      "NLTK": {},
      "Transformers": {},
      "FastAPI": {},
      "Streamlit": {},
      "Gradio": {}
    },
    "Neural Networks": {
      DNN: {},
      CNN: {},
      RNN: {},
      LSTM: {},
      GRU: {},
      MLP: {},
      PointNet: {}
    },
    "Modern Architectures": {
      Transformer: {},
      BERT: {},
      GPT: {},
      Diffusion: {},
      "Vision Transformer": {},
      CLIP: {},
      SAM: {},
      NeRF: {},
      LoRA: {},
      RLHF: {}
    },
    "Learning Paradigms": {
      "Self-Supervised Learning": {},
      "Transfer Learning": {},
      "Few-Shot Learning": {},
      "Unsupervised Learning": {},
      "Reinforcement Learning": {},
      "Online Learning": {},
      "Contrastive Learning": {}
    },
    "3D Deep Learning": {
      "Point Cloud": {},
      Classification: {},
      Segmentation: {},
      "3D Object Detection": {},
      "Scene Reconstruction": {}
    },
    "Computer Vision": {
      "Image Classification": {},
      "Object Detection": {},
      "Image Segmentation": {},
      "Stereo Depth Estimation": {},
      "Underwater Vision": {},
      "Optical Flow": {},
      "Super Resolution": {},
      "3D Perception": {},
      "Image Processing": {},
      "Gaze Tracking": {}
    }
  },

  "AI & Search Algorithms": {
    "Artificial Intelligence": {
      "AI Fundamentals": {
        "AI Agent": {},
        "AI Planning": {},
        "Heuristics": {},
        "Turing Test": {},
        "Symbolic vs Statistical AI": {}
      },
      "Adversarial Search": {
        "Minimax": {},
        "Alpha-Beta Pruning": {},
        "Monte Carlo Tree Search": {},
        "Deadlock Detection": {}
      },
      "Learning Paradigms": {
        "Reinforcement Learning": {},
        "Supervised Learning": {},
        "Unsupervised Learning": {},
        "Self-Supervised Learning": {}
      },
      "Knowledge Representation": {
        "Logic-Based": {
          "Propositional Logic": {},
          "First-Order Logic": {}
        },
        "Rule-Based Systems": {},
        "Ontologies": {},
        "Semantic Networks": {},
        "Knowledge Graphs": {}
      },
      "Reasoning & Inference": {
        "Deductive Reasoning": {},
        "Inductive Reasoning": {},
        "Abductive Reasoning": {},
        "Probabilistic Reasoning": {
          "Bayesian Networks": {},
          "Markov Models": {},
          "Hidden Markov Models": {},
          "Fuzzy Logic": {},
          "Bayesian Methods": {}
        }
      },
      "NLP (Natural Language Processing)": {
        "Syntax Parsing": {},
        "Named Entity Recognition": {},
        "Sentiment Analysis": {},
        "Transformers": {}
      },
      "Ethics & Safety": {
        "Explainability": {},
        "Bias in AI": {},
        "AI Safety": {},
        "Responsible AI": {}
      }
    },

    "Graph Algorithms & Game AI": {
      "Graph Algorithms": {
        "Search Algorithms": {
          "DFS (Depth-First Search)": {},
          "BFS (Breadth-First Search)": {},
          "Dijkstra's Algorithm": {},
          "Bellman-Ford Algorithm": {},
          "A* Search": {},
          "Binary Search": {},
        },
        "Graph Theory": {},
        "Graph Visualization": {},
        "Graph Optimization": {
          "Minimum Spanning Tree": {
            "Prim's Algorithm": {},
            "Kruskal's Algorithm": {}
          },
          "Network Flow": {},
          "Graph Partitioning": {}
        },
        "Graph Pruning": {
          "Minimax Pruning": {},
          "Alpha-Beta Pruning": {},
          "Monte Carlo Tree Search": {}
        }
      },
      "Game AI": {
        "Minimax Algorithm": {},
        "Alpha-Beta Pruning": {},
        "Monte Carlo Tree Search": {},
        "Deadlock Detection": {}
      }
    }
  },



  "Control Systems & Robotics": {
    "Control Systems": {
      MPC: {},
      "Hybrid MPC": {},
      "Adaptive-Control": {},
      "PID Control": {},
      "Optimal Control": {}
    },
    "System Identification": {
      "System Modeling": {},
      "Parameter Estimation": {},
      "State Estimation": {},
      "Kalman Filter": {},
      "Extended Kalman Filter": {},
      "Unscented Kalman Filter": {},
      "Particle Filter": {},
      "System Dynamics": {},
      "Dynamical Systems": {},
      "Kernel Regression": {},
      "ARMAX": {},
      "Gaussian Processes": {}
    },
    Robotics: {
      SLAM: {},
      "Path Planning": {},
      "Autonomous Navigation": {},
      "Mobile Robotics": {},
      "Frenet Planner": {},
      "Sensor Fusion": {},
      "Integration": {}
    },
    "Perception & Sensors": {
      IMU: {},
      LiDAR: {},
      Cameras: {},
      Encoders: {}
    },
    "Communication & Interfaces": {
      "CAN Bus": {},
      I2C: {},
      SPI: {},
      UART: {}
    },
    "Simulation & Platforms": {
      Gazebo: {},
      Rviz2: {},
      "Carla Simulator": {},
      Webots: {},
      IsaacSim: {},
      "V-REP": {},
      "ROS2": {},
      "Carla": {},
      "ROS": {},
      "CATKIN Workspace": {}
    },
    "Embedded & Hardware": {
      Arduino: {},
      Embedded: {},
      Hardware: {},
      CAD: {},
      PCB: {},
      FPGA: {},
      Microcontrollers: {},
      RTOS: {},
      "Real-Time Scheduling": {}
    }
  },

  "Graphics & Visualization": {
    "Rendering Engines": {
      OpenGL: {},
      WebGL: {},
      Vulkan: {},
      Unity: {},
      Unreal: {},
      Godot: {}
    },
    "Shaders & Effects": {
      GLSL: {},
      "Physically Based Rendering": {},
      GPGPU: {}
    },
    "3D Modeling": {
      Blender: {},
      "Mesh Processing": {},
      "Ray Tracing": {},
      Shaders: {}
    },
    Visualization: {
      D3: {},
      Matplotlib: {},
      Plotly: {},
      "Graph Visualization": {},
      ThreeJS: {}
    }
  },

  "Math & Theory": {
    "Linear Algebra": {},
    "Numerical Optimization": {},
    "Probability & Statistics": {},
    "Information Theory": {},
    "Graph Theory": {}
  },

  "Data Science & Analysis": {
    "Data Analysis": {
      "High-Dimensional Data": {},
      "Statistical Noise": {},
      "Correlation Structure": {},
      "Exploratory Analysis": {},
      "Time Series Forecasting": {},
      "Financial Analysis": {}
    },
    "Scientific Computing": {
      NumPy: {},
      Pandas: {},
      SciPy: {},
      "scikit-learn": {},
      "scikit-image": {},
      Matplotlib: {}
    },
    "Optimization & Math Tools": {
      "Optimal Transport": {},
      "Wasserstein Distance": {},
      JAX: {},
      "ott-jax": {}
    }
  },

  "Web Development & DevOps": {
    Frontend: {
      HTML: {},
      CSS: {},
      JavaScript: {},
      TypeScript: {},
      React: {},
      Tailwind: {},
      NextJS: {}
    },
    Backend: {
      NodeJS: {},
      Express: {},
      Django: {},
      Flask: {},
      GraphQL: {}
    },
    DevOps: {
      Docker: {},
      Kubernetes: {},
      GitHubActions: {},
      Jenkins: {},
      CI_CD: {}
    }
  },

  "Networking & Systems": {
    Networking: {
      SONiC: {},
      YANG: {},
      Redis: {},
      MQTT: {},
      HTTP: {},
      TCP_IP: {}
    },
    "Operating Systems": {
      Linux: {},
      "Embedded OS": {},
      RTOS: {}
    },
    "Distributed Systems": {
      "Data Center": {},
      Kubernetes: {},
      "Message Queues": {}
    }
  },

  "Energy & Smart Systems": {
    "Smart Grid": {
      HEMS: {},
      "Energy Optimization": {},
      "Battery Storage": {},
      "Heat Pump Control": {},
      "Load Forecasting": {}
    }
  },

  "Localization & Wireless": {
    Bluetooth: {
      CTE: {},
      RSSI: {},
      Beamforming: {}
    },
    "Localization & Tracking": {
      Localisation: {},
      Positioning: {},
      Tracking: {},
      SLAM: {}
    }
  },

  "Applications & Domains": {
    "Biomedical Engineering": {
      Tracheostomy: {},
      "Health Monitoring": {},
      "Wearable Devices": {},
      "Assistive Technology":{},
      "Brain Computer Interface (BCI)":{}
    },
    "Autonomous Systems": {
      "Self-driving Cars": {},
      "Marine Robotics": {}
    },
    Gaming: {
      "Board Games": {},
      "Puzzle Solvers": {},
      Sokoban: {}
    },
    Education: {
      Hackathon: {},
      Portfolio: {},
      "Open Source": {}
    }
  },
  Internship:{
    "Microsoft": {},
    "Museums Victoria": {},
    "John NeuroBionics Lab": {}
  },

  "Dev Tools & IDEs": {
    Editors: {
      VSCode: {},
      Vim: {},
      Emacs: {}
    },
    Tooling: {
      Git: {},
      Bash: {},
      Make: {},
      CMake: {},
      Jupyter: {}
    }
  }
};

export { hierarchy };

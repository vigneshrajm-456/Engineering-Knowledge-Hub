import { Article, Project, Video, GalleryItem, Announcement, TeamMember } from './types';

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Designing a Real-time Rocket Telemetry Pipeline with Rust and WASM',
    category: 'Rocketry',
    tags: ['Rust', 'Telemetry', 'WASM', 'WebSockets'],
    excerpt: 'Building high-frequency, low-latency flight telemetry dashboards using Rust compiled to WebAssembly for reliable serialization on resource-constrained ground stations.',
    content: `### High-Frequency Rocket Telemetry: The Challenge
During a suborbital rocket launch, the avionics stack streams attitude state, propulsion pressures, and GPS coordinates at rates of **200Hz or higher**. Ground station decoders must handle these binary packets with absolute zero drop rate, parse floating-point metrics instantly, and render interactive Canvas or WebGL visualizers in sync with the flight clock.

In this deep dive, we walk through constructing a zero-allocation parsing pipeline in **Rust**, compiling it to **WebAssembly (WASM)**, and interfacing directly with a React-based frontend using raw WebSockets.

---

### Why Rust for ground stations?
Standard JavaScript-based deserializers run into heavy garbage collector sweeps when parsing 50KB/s of high-frequency telemetry bytes. By passing the binary ArrayBuffer directly to a pre-allocated WASM buffer, we can perform byte-unpacking entirely within memory registers.

\`\`\`rust
// WASM Serialization Struct in Rust
#[wasm_bindgen]
pub struct telemetry_packet {
    pub timestamp: u32,
    pub pitch: f32,
    pub yaw: f32,
    pub roll: f32,
    pub chamber_pres: f32,
    pub battery_v: f32,
}
\`\`\`

---

### Step-by-Step Architecture
1. **The Ingress Layer**: High-frequency telemetry streams via 915MHz LoRa RF links to our Raspberry Pi ground station.
2. **The Serialization Buffer**: Decoded packets are packed as raw structured binary payloads.
3. **The WASM Renderer**: Our custom-compiled decoder unpacks payload structures without initiating JS engine object allocations.
4. **The UI Layer**: WebGL state visualizers render real-time orientation vectors.

By utilizing this stack, memory usage remains entirely flat — avoiding standard frame drops from V8 garbage collection mid-flight.`,
    coverImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Lead Avionics Engineer'
    },
    date: 'May 28, 2026',
    readingTime: '6 min read',
    trending: true,
    views: 1240,
    likes: 342
  },
  {
    id: 'art-2',
    title: 'Deploying TinyML on STM32 for Anomaly Detection in Industrial Rotors',
    category: 'IoT',
    tags: ['TinyML', 'STM32', 'EdgeAI', 'VibrationAnalysis'],
    excerpt: 'Training custom micro-models with TensorFlow Lite Micro to analyze multi-axis accelerometers in real-time right at the edge, flashing onto Cortex-M4 microcontrollers.',
    content: `### Anomaly Detection at the Edge: TinyML on Cortex-M4
Industrial rotors fail catastrophicly when bearings slip even a fraction of a millimeter. Standard solutions stream vibration telemetry to the cloud for analysis; however, this requires constant high-bandwidth wireless connections, which are often unavailable in deep industrial pits.

By deploying a **TensorFlow Lite Micro** model directly onto an **STM32F4 Discovery** board containing an ARM Cortex-M4 unit, we perform 1D convolutional neural network inference directly on the sensor's raw vibration output.

---

### Core Hardware Configuration
- **Processor**: STM32F407VGT6 (168 MHz, 1MB Flash, 192KB RAM)
- **Sensor**: LIS3DSH High-Resolution 3-Axis Accelerometer
- **Inference Mode**: Fully Quantized INT8 weights to fit in SRAM.

\`\`\`cpp
// STM32 Main Loop Snippet
void Loop() {
  // 1. Read accelerometer register buffers
  ReadVibrationSample(&input_buffer);

  // 2. Perform Quantized INT8 NN Inference
  TfLiteStatus invoke_status = interpreter->Invoke();
  if (invoke_status != kTfLiteOk) {
    LogDebug("Inference Failure!");
    return;
  }

  // 3. Extract trigger state
  int8_t anomaly_score = output->data.int8[1];
  if (anomaly_score > CRITICAL_THRESHOLD) {
    TriggerHardcoreShutdown();
  }
}
\`\`\`

---

### Training & Quantization
We gathered over 40 hours of normal and induced slipping bearing datasets, trained a lightweight 1D-CNN, and quantized weights to INT8 under Post-Training Quantization (PTQ). This reduced the binary size from **1.2MB** down to a mere **44KB**, placing it gracefully into ARM flash memory.`,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Embedded Developer'
    },
    date: 'May 15, 2026',
    readingTime: '8 min read',
    trending: false,
    views: 840,
    likes: 195
  },
  {
    id: 'art-3',
    title: 'Mastering the CAN Bus Protocol for Resilient Automotive Network Architecture',
    category: 'Embedded',
    tags: ['CANBus', 'Automotive', 'Hardware', 'Debugging'],
    excerpt: 'A comprehensive engineering guide on Controller Area Network packet structure, arbitration priorities, and electrical termination techniques for harsh electromagnetic fields.',
    content: `### Introduction to CAN Bus Networks
In early automotive designs, manufacturers ran heavy copper wire looms from the battery directly to switches and components, resulting in massive weight and excessive physical failure nodes.

The **Controller Area Network (CAN)** solves this by utilizing a differential two-wire differential signal bus multiplexed right across the system, ensuring robust noise immunity and self-arbitrated packet collision resolution under critical operations.

---

### Essential CAN Properties
1. **Differential Signaling**: Under high electromagnetic interference, high and low lines shift together, meaning the transceiver's operational voltage difference remains clean.
2. **Non-Destructive Bitwise Arbitration**: If two nodes transmit simultaneously, the node sending the lower numerical Identifier (e.g., Engine Brake state) keeps control. The node with the higher ID backs off instantly without corrupting the signal.

---

### Hardware Termination Tip
Ensure to solder exactly a **120 Ohm resistor** across CAN_High and CAN_Low lines at the extreme physical ends of your wire loom. This prevents transceiver transmission waves reflecting back down the copper line and corrupting ongoing data frames.`,
    coverImage: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Lead Avionics Engineer'
    },
    date: 'Apr 22, 2026',
    readingTime: '5 min read',
    trending: true,
    views: 1930,
    likes: 541
  },
  {
    id: 'art-4',
    title: 'The Evolution of Transformer Architecture: Beyond Self-Attention',
    category: 'AI',
    tags: ['AI', 'Transformers', 'DeepLearning', 'LLM'],
    excerpt: 'Analyzing recent breakthroughs in AI including Linear-complexity attention variants, state-space representations, and hierarchical training mechanisms.',
    content: `### Multi-Query and Linear Attention Breakthroughs
The fundamental core of modern Large Language Models is the **Self-Attention** matrix, calculating relationships dynamically across input contexts. However, self-attention exhibits **quadratic time complexity (O(N^2))**, limiting processing window scaling.

In this paper, we explore alternative architectural shifts such as **Mamba (State Space Models)** and linear-complexity attention frameworks.

---

### Key Comparisons
- **Standard Softmax Attention**: Fully models fine-grained cross-token relations but requires high VRAM.
- **Linear Attention (Performer/Informer)**: Approximates kernel queries to scale context sizes smoothly.
- **State-Space models (SSM)**: Treats sequences like continuous linear systems, allowing O(1) inference states.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Evelyn Foster',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      role: 'AI Research Lead'
    },
    date: 'Mar 10, 2026',
    readingTime: '10 min read',
    trending: true,
    views: 3100,
    likes: 802
  },
  {
    id: 'art-5',
    title: 'Architecting a Distributed Key-Value Store from Scratch in Go',
    category: 'Software',
    tags: ['Go', 'Raft', 'DistributedSystems', 'gRPC'],
    excerpt: 'A deep dive into building an LSM-tree backed database from the ground up, implementing the Raft consensus protocol for partition-tolerant write replication.',
    content: `### Distributed Databases: The Consensus Hard Problem
In a distributed environment, ensuring multiple independent computer nodes agree on a single database write state requires rock-solid protocols. If a network partition occurs, some nodes may accept newer parameters than others, resulting in split-brain data corruption.

To solve this, we construct a custom storage cluster utilizing **Raft consensus** on top of a highly optimized **Log-Structured Merge-tree (LSM-tree)** local key-value write engine in Go.

---

### Structural Components of Raft Nodes
1. **The Leader**: Acts as the single entry gate for all client writes, replicates entries across followers, and coordinates heartbeat timings.
2. **The Follower**: Accepts replicated logs from the Leader, validates current terms, and updates active state machine indices.
3. **The Candidate**: Initiates vote invitations when heartbeats timeout, seeking to establish a new cluster leadership.

\`\`\`go
// Raft Node state definition in Go
type RaftNode struct {
	mu        sync.Mutex
	peers     []string
	nodeId    string
	term      uint64
	votedFor  string
	log       []LogEntry
	commitIdx uint64
	state     NodeState
}
\`\`\`

---

### High-performance LSM Local Storage
Traditional storage models perform random writes directly on database files, which results in physical disk-arm travel bottlenecks. In our LSM architecture, writes are appended strictly sequentially to an active memory commit log (**MemTable**). 

Once the MemTable hits **4MB**, it is serialized down onto solid-state drives as static, sorted files known as **SSTables (Sorted String Tables)**. Background compactor threads continually merge duplicate indices using a multi-way merge-sort algorithm, preserving bandwidth and clean random reads.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Embedded Developer'
    },
    date: 'May 05, 2026',
    readingTime: '12 min read',
    trending: false,
    views: 1450,
    likes: 312
  },
  {
    id: 'art-6',
    title: 'Training Physics-Informed Neural Networks (PINNs) for Fluid Dynamic Predictions',
    category: 'AI',
    tags: ['PINN', 'PyTorch', 'FluidDynamics', 'SciML'],
    excerpt: 'Discover how to embed the Navier-Stokes equations directly into a deep learning neural network loss function, achieving extremely realistic flow simulations with 100x less training data.',
    content: `### Merging Deep Learning with Partial Differential Equations
Standard neural networks are exceptional at detecting surface correlations from high-granularity datasets, but completely collapse when queried on boundary spaces containing zero historic training telemetry.

**Physics-Informed Neural Networks (PINNs)** resolve this by integrating known physical laws – in this case, the **Navier-Stokes equations** for fluid conservation – directly into the backpropagation neural network loss function.

---

### Formulating the Navier-Stokes Loss Operator
The network takes raw spatial coordinates $(x, y)$ and time $(t)$ as inputs and outputs the velocity vector $(u, v)$ alongside pressure $(p)$. Instead of calculating loss solely against supervised labels, we evaluate the spatial partial derivatives of the output using PyTorch's Automatic Differentiation (\`autograd\`).

\`\`\`python
# Physical Residual Loss Formulation in PyTorch
def physical_loss(x, y, t, u, v, p):
    # compute local gradients
    u_t = grad(u, t, create_graph=True)
    u_x = grad(u, x, create_graph=True)
    u_xx = grad(u, x, 2, create_graph=True)
    
    # Navier-Stokes structural residual
    momentum_residual = u_t + u * u_x + p_x - (1.0 / REYNOLDS_NUMBER) * u_xx
    return torch.mean(momentum_residual ** 2)
\`\`\`

---

### Training Trajectory Metrics
By penalizing outputs that disobey mechanical mass and force balances, PINNs achieve high physical validity under severe extrapolation boundaries. Convergence is tracked using custom SciPy L-BFGS optimizers, allowing convergence times to drop by **35%** compared to standard Adam iterations alone.`,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Evelyn Foster',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      role: 'AI Research Lead'
    },
    date: 'Apr 12, 2026',
    readingTime: '9 min read',
    trending: true,
    views: 2280,
    likes: 674
  },
  {
    id: 'art-7',
    title: 'Advanced PCB Layout Guidelines for GHz Differential Signals',
    category: 'Embedded',
    tags: ['PCB', 'Altium', 'SignalIntegrity', 'Hardware'],
    excerpt: 'A rigorous hardware manual on impedance matching, coplanar waveguide calculators, stackup design, and crosstalk mitigation for high-speed DDR4 boards.',
    content: `### High-Speed Signal Integrity Challenges
When physical signal frequencies surpass **1GHz**, copper pcb traces stop acting like simple conduction paths and begin behaving as high-performance **transmission waveguides**. Power reflects, electromagnetic fields overlap, and signal edges distort unless trace parameters are calculated with deep geometry control.

Here, we outline essential layout parameters required to successfully route differential signaling schemes without timing compromises.

---

### Precise Differential Trace Routing Priorities
1. **Target Differential Impedance**: Must be kept at exactly **100 Ohms** (or 90 Ohms for USB links) throughout every centimeter of trace track.
2. **Coupled Trace Symmetry**: Maintain identical physical lengths on positive and negative traces to prevent phase offset distortions.
3. **Continuous Ground Return Plane**: Ensure a solid, unbroken ground reference plane sits directly on the PCB layer below high-speed differential signal pairs.

---

### Signal Routing Checklist in Altium
- **Avoid 90-Degree Corners**: Acute physical corners concentrate electric field lines and act as reflection nodes. Always route high-speed tracks with smooth 45-degree angles or curved arcs.
- **Trace length matching**: Utilize active accordion tuning routines to balance trace signals within a fine tolerance of **10 mils** (0.25mm) offset.`,
    coverImage: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      role: 'Lead Avionics Engineer'
    },
    date: 'Feb 18, 2026',
    readingTime: '7 min read',
    trending: false,
    views: 1540,
    likes: 410
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'AeroTelemetry v3: Real-Time Suborbital Flight Panel',
    category: 'Rocket Telemetry',
    tags: ['React', 'Rust-WASM', 'ThreeJS', 'WebSockets'],
    description: 'A WebGL-powered 3D rocket flight panel that processes high-frequency telemetry over RF and aligns three-axis orientation matrices.',
    content: `### AeroTelemetry v3: Liquid Propulsion Monitor
This project is an open-source suborbital telemetry visualizer used by student launch groups and amateur rocketry clubs. It displays barometric altitudes, GPS coords, thermal grids, and structural load states in complete sync.

#### Features
- **3D Attitude Representation**: Utilizes ThreeJS coupled with WASM quaternion calculations to stream live pitch, yaw, and roll vectors.
- **Multi-Sensor Plotting**: Renders high-frequency canvas timelines for motor chamber pressures and structural load cells.
- **GPS Ground Track Mapping**: Fully offline topographic maps with ground station orientation guidance vectors.`,
    coverImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    metrics: [
      { label: 'Ingress Parser Latency', value: '< 2.4ms' },
      { label: 'Peak Data Frequency', value: '250 Hz' },
      { label: 'Web Worker Thread Count', value: '3 Active Threads' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80'
    ],
    demoUrl: '#',
    githubUrl: 'https://github.com/engineering-knowledge-hub/aerotelemetry'
  },
  {
    id: 'proj-2',
    title: 'EdgeAI-Gimbal: Microcontroller Vision Motor System',
    category: 'IoT Systems',
    tags: ['STM32', 'FreeRTOS', 'TensorFlowLite', 'HardwareDesign'],
    description: 'An active camera stabilization and optical object-tracking gimbal driven by a lightweight YOLOv8 micro-model.',
    content: `### EdgeAI Gimbal System
A high-accuracy dual-axis mechanical camera mount featuring micro-inference models running on an ARM Cortex-M7 board at 30fps.

#### Features
- **Ultra-Stiff Dual Feedback Loops**: Cascade PID controllers running on hardware encoders with sub-degree feedback latency.
- **Embedded Inference**: Edge YOLOv8 quantization yields high accuracy tracking on person/rocket shapes.
- **FreeRTOS Task Management**: Dedicated scheduling locks down sensor sampling and motor driver outputs into isolated, priority-governed threads.`,
    coverImage: 'https://images.unsplash.com/photo-1508244751656-78609be97c36?auto=format&fit=crop&w=800&q=80',
    status: 'Completed',
    metrics: [
      { label: 'Tracking Delay', value: '18ms' },
      { label: 'Inference Frequency', value: '32 FPS' },
      { label: 'Motor Slew Rate', value: '720 deg/sec' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
    ],
    githubUrl: 'https://github.com/engineering-knowledge-hub/edge-gimbal'
  },
  {
    id: 'proj-3',
    title: 'CognitiveNode: Autonomous Swarm Routing AI',
    category: 'AI Projects',
    tags: ['Python', 'Kubernetes', 'PyTorch', 'gRPC'],
    description: 'An AI-driven neural routing network matching packet flows over dynamic edge topologies using cooperative RL agents.',
    content: `### Swarm Routing Optimization via Reinforcement Learning
CognitiveNode sets up self-healing communications in mesh nodes using decentralized deep Q-networks (D-DQN).

#### Architecture Detail
Each wireless node runs a tiny PyTorch execution core. Under packet congestion, nodes cooperate dynamically to map route vectors without static central switches.`,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    status: 'In Development',
    metrics: [
      { label: 'Simulation Nodes', value: '512 Nodes' },
      { label: 'Latency Recovery', value: '0.8s' },
      { label: 'Bandwidth Recovery', value: '94.2%' }
    ],
    gallery: [],
    demoUrl: '#'
  },
  {
    id: 'proj-4',
    title: 'LapisDB: Browser-Native IndexedDB SQL Console',
    category: 'Web Applications',
    tags: ['TypeScript', 'SQL', 'IndexedDB', 'Wasm', 'Vite'],
    description: 'An interactive, browser-native database console compiling standard SQL queries into transactional IndexedDB operations.',
    content: `### LapisDB: SQL Engine inside Web Browsers
LapisDB compiles standardized SQL query statements into asynchronous transactional cursor lookups over browser IndexedDB databases, boosting static offline capabilities significantly.

#### Features
- **Live AST Parsing**: Fully featured AST compiler written in raw TypeScript, validating schemas before executions.
- **Zero-Network Sandboxing**: Operations run entirely client-side, ensuring complete data sovereignty for private data.
- **High-Performance Joins**: Customized hash-join indexes resolve complex relations inside IndexedDB tables.`,
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    status: 'Completed',
    metrics: [
      { label: 'Query Execution', value: '< 1.1ms' },
      { label: 'Data Compression', value: '72%' },
      { label: 'SRAM Footprint', value: '2.5 MB' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80'
    ],
    demoUrl: '#',
    githubUrl: 'https://github.com/engineering-knowledge-hub/lapis-db'
  },
  {
    id: 'proj-5',
    title: 'HeliosTrack: Phased-Array Solar Inverter Node',
    category: 'IoT Systems',
    tags: ['ESP32', 'Modbus', 'Telemetry', 'InfluxDB'],
    description: 'A dual-axis solar tracking system powered by an ESP32 microcontroller with automatic Modbus RTU diagnostic feeds.',
    content: `### HeliosTrack Solar Harvesting Console
HeliosTrack is a distributed hardware controller that captures maximum solar radiation using real-time astronomical algorithms.

#### Features
- **Astronomical Positioning Algorithm**: Custom offline calculations determine solar azimuth down to 0.05-degree precision.
- **Modbus Diagnostic Node**: Streams motor power draw and temperature signatures directly to central SCADA systems.
- **Industrial Enclosure**: Waterproof, high-vibration IP67 certified hardware mount designed for harsh salt flats.`,
    coverImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    metrics: [
      { label: 'Harvesting Efficiency', value: '+ 34.6%' },
      { label: 'Wind Survivability', value: '140 km/h' },
      { label: 'Packet Error Rate', value: '0.02%' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80'
    ],
    githubUrl: 'https://github.com/engineering-knowledge-hub/heliostrack-node'
  },
  {
    id: 'proj-6',
    title: 'BioLobe: Electromyography Muscle Impulse Classifier',
    category: 'AI Projects',
    tags: ['Python', 'SciPy', 'RandomForest', 'PyQt', 'EEG'],
    description: 'A live brain-computer interface system rendering 8-channel raw muscle potential streams and classifying grips at microsecond speed.',
    content: `### BioLobe Grip Classifier
BioLobe is a high-speed machine-learning-driven prosthetic controller converting micro-volt muscle potentials into distinct hardware grab vectors.

#### Features
- **Active Filtering Pipeline**: Real-time 50Hz notch filters and bandpass filters remove power-grid electromagnetic hum.
- **Random Forest Classifier**: Lightweight decision-trees achieve 98.4% grip prediction accuracy with low computational footprints.
- **Live 3D Hand Model**: Visually maps active class triggers to simulated physical robotic arms.`,
    coverImage: 'https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&w=800&q=80',
    status: 'In Development',
    metrics: [
      { label: 'Channels Logged', value: '8 Channels' },
      { label: 'Classification Time', value: '45ms' },
      { label: 'Signal-to-Noise Ratio', value: '42 dB' }
    ],
    gallery: []
  }
];

export const VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'Debugging SPI/L2C Protocols with an Oscilloscope & Logic Analyzer',
    category: 'Tutorials',
    tags: ['Scope', 'Debugging', 'Hardware', 'I2C', 'SPI'],
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    duration: '18:45',
    views: 4890,
    date: 'May 12, 2026',
    description: 'A structural guide mapping active clock lines, timing slopes, bus pull-up sizing, and typical node addressing state issues.',
    youtubeId: 'dQw4w9WgXcQ' // Standard safe embed mock
  },
  {
    id: 'vid-2',
    title: 'Suborbital Avionics Live-Stream Integration Test',
    category: 'Project Demonstrations',
    tags: ['Rocketry', 'Avionics', 'RF', 'Telemetry'],
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    duration: '12:30',
    views: 3120,
    date: 'Apr 04, 2026',
    description: 'Live field footage detailing antenna polarization alignment, SMA cable attenuation, and cold chamber battery thermistor tests.',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'vid-3',
    title: 'Understanding High-Speed Signal Reflection & Trace Impedance Match',
    category: 'Engineering Concepts',
    tags: ['Impedance', 'PCB', 'SignalIntegrity', 'Reflection'],
    thumbnail: 'https://images.unsplash.com/photo-1517055720730-0d53fb2a878b?auto=format&fit=crop&w=800&q=80',
    duration: '22:15',
    views: 5210,
    date: 'Mar 15, 2026',
    description: 'An educational walkthrough of wave propagation over traces, dielectric parameters, Smith chart impedance matching, and end-line terminations.',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: 'vid-4',
    title: 'Sub-microsecond Finite Impulse Response Filter Assembly Optimization',
    category: 'Development Logs',
    tags: ['Cortex-M4', 'Assembly', 'DSP', 'Filter'],
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
    duration: '15:40',
    views: 1890,
    date: 'Jan 20, 2026',
    description: 'A deep-dive programming log showing Cortex-M4 assembly tricks, dual multiply-accumulate registers, and SIMD commands to filter accelerometer noise.',
    youtubeId: 'dQw4w9WgXcQ'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Liquid Propellant Injection Grid Ring',
    category: 'CAD',
    description: 'Finite element mesh of an impinging stream rocket injector system designed for nitrous oxide and ethanol.',
    imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80',
    contributor: 'Chen, S.',
    date: 'May 06, 2026'
  },
  {
    id: 'gal-2',
    title: 'TinyML Microcontroller Enclosure System',
    category: 'Hardware',
    description: 'Completed 3D-printed vibration monitor mount enclosing STM32 boards with differential silicone mounting arrays.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    contributor: 'Vance, M.',
    date: 'Apr 18, 2026'
  },
  {
    id: 'gal-3',
    title: 'Phased Array Antenna Ground Field Rig',
    category: 'Field Test',
    description: 'RF ground station array during azimuth calibration tests with telemetry receivers tracking low orbits.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    contributor: 'RF Ops Lab',
    date: 'Mar 25, 2026'
  },
  {
    id: 'gal-4',
    title: 'Direct Fourier Transform Vibration Spectrum',
    category: 'Visualizer',
    description: 'A real-time Fast Fourier Transform (FFT) waterfall spectrum visualization showing motor harmonics and subharmonic resonances under high torque load.',
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80',
    contributor: 'Foster, E.',
    date: 'Feb 10, 2026'
  },
  {
    id: 'gal-5',
    title: 'Cryogenic Valve Fuel Bellows Rig',
    category: 'Field Test',
    description: 'Bellows valves under mechanical testing with liquid nitrogen at cryogenic conditions inside the vacuum thermo chamber.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    contributor: 'Avionics Lab',
    date: 'Jan 15, 2026'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Avionics Design & Flight Telemetry Intensive Workshop',
    type: 'Workshops',
    category: 'Avionics',
    date: 'June 18, 2026',
    content: 'An intensive, hands-on workshop guiding participants through design guidelines, firmware state structures in FreeRTOS, and real-time dashboard plotting.',
    location: 'Avionics Building Auditorium B & Live Virtual Stream-Link',
    registrationUrl: '#'
  },
  {
    id: 'ann-2',
    title: 'Autonomous Swarm Rover Championship 2026',
    type: 'Competitions',
    category: 'Robotics',
    date: 'July 15, 2026',
    content: 'Assemble five-device micro-rover squads to navigate dynamic lunar topologies using localized routing and absolute zero GPS connectivity.',
    location: 'Deep Ground Robotics Arena, Sector 4',
    registrationUrl: '#'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sarah Chen',
    role: 'Co-Founder & Lead Avionics Engineer',
    bio: 'Former aerospace payload architect specialized in FPGA-driven rocket telemetry systems and differential RF routing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
    specialty: ['FPGA', 'High-Frequency RF', 'C++', 'System Architecture'],
    social: {
      github: 'https://github.com/sarah-chen-space',
      linkedin: 'https://linkedin.com/in/sarah-chen-avionics',
      email: 's.chen@ek-hub.org'
    }
  },
  {
    id: 'team-2',
    name: 'Marcus Vance',
    role: 'Lead Embedded Systems Engineer',
    bio: 'Passionate low-power hardware developer focused on TinyML implementations and high-vibration sensor telemetry chains.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    specialty: ['ARM Cortex-M', 'TinyML', 'FreeRTOS', 'CAN Bus'],
    social: {
      github: 'https://github.com/marcus-vance-embedded',
      linkedin: 'https://linkedin.com/in/marcus-vance-hardware',
      email: 'm.vance@ek-hub.org'
    }
  },
  {
    id: 'team-3',
    name: 'Dr. Evelyn Foster',
    role: 'Principal AI Researcher',
    bio: 'Academic researcher pushing the limits of linear attention Transformers and predictive physics pipelines on custom neural edge accelerators.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    specialty: ['Neural Architectures', 'Edge Accelerators', 'Physics-Informed ML'],
    social: {
      github: 'https://github.com/evelyn-foster-ai',
      linkedin: 'https://linkedin.com/in/dr-evelyn-foster',
      email: 'e.foster@ek-hub.org'
    }
  }
];

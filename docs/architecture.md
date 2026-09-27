# NodeGoat Architecture Diagram

```mermaid
flowchart TB
    subgraph Internet["Public Internet (untrusted)"]
        User["Browser / User"]
    end

    subgraph DockerHost["Docker Host"]
        subgraph BridgeNet["nodegoat-net (Docker bridge network)"]
            Web["nodegoat-web container<br/>Express + EJS<br/>Port 4000 exposed"]
            DB["nodegoat-mongo container<br/>MongoDB<br/>Port 27017 (internal only)"]
        end
    end

    User -- "HTTP requests<br/>login, signup, allocations,<br/>contributions, profile data" --> Web
    Web -- "Mongo queries/writes<br/>internal network only" --> DB

    style Internet fill:#ffe0e0
    style BridgeNet fill:#e0f0ff
    style Web fill:#fff3cd
    style DB fill:#d4edda
```

**Trust boundaries:**
- **Boundary 1**: Public internet ↔ `nodegoat-web` (port 4000 exposed to host) — untrusted input enters here
- **Boundary 2**: `nodegoat-web` ↔ `nodegoat-mongo` (internal Docker network only, port 27017 not exposed to host in production) — only the web container should reach the DB
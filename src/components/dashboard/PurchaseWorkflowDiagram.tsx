import ReactFlow, { Controls, Background, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

interface WorkflowStage {
  id: string;
  label: string;
  count?: number;
  isActive?: boolean;
  x?: number;
  y?: number;
}

interface WorkflowConnection {
  source: string;
  target: string;
  id?: string;
}

interface PurchaseWorkflowDiagramProps {
  data?: {
    stages: WorkflowStage[];
    connections: WorkflowConnection[];
  };
}

const PurchaseWorkflowDiagram = ({ data }: PurchaseWorkflowDiagramProps) => {
  if (!data) {
    return <div style={{ height: '300px', textAlign: 'center', paddingTop: '20px', border: '1px solid #eee' }}>Loading workflow...</div>;
  }

  const nodes: Node[] = (data.stages || []).map((stage, index) => ({
    id: stage.id,
    data: { label: stage.label },
    position: { x: stage.x ?? 0, y: stage.y ?? (index * 100) },
  }));

  const edges: Edge[] = (data.connections || []).map((conn, index) => ({
    id: conn.id ?? `e${index}`,
    source: conn.source,
    target: conn.target,
  }));

  return (
    <div style={{ height: '300px', border: '1px solid #eee' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default PurchaseWorkflowDiagram;

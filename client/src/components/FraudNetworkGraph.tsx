'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getFraudNetwork } from '../../lib/api';

const NODE_WIDTH = 140;

const truncate = (str: string, n: number) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export default function FraudNetworkGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFraudNetwork();
        const { nodes: rawNodes, edges: rawEdges } = response.data;

        const mappedNodes: Node[] = rawNodes.map((node: any) => {
          const type = node.type;
          let backgroundColor = '#3b82f6';
          let borderRadius = '10px';
          let label = '';

          switch (type) {
            case 'Bidder':
              backgroundColor = '#3b82f6';
              label = node.props.name;
              break;
            case 'Director':
              backgroundColor = '#ef4444';
              borderRadius = '50%';
              label = node.props.name;
              break;
            case 'Address':
              backgroundColor = '#10b981';
              label = truncate(node.props.full || '', 20);
              break;
            case 'BankAccount':
              backgroundColor = '#f59e0b';
              label = node.props.number;
              break;
            case 'Phone':
              backgroundColor = '#8b5cf6';
              label = node.props.number;
              break;
          }

          return {
            id: node.id,
            data: { label },
            position: { x: Math.random() * 800, y: Math.random() * 400 },
            style: {
              backgroundColor,
              color: '#fff',
              borderRadius,
              border: '2px solid #fff',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              width: NODE_WIDTH,
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '600',
              textAlign: 'center',
            },
          };
        });

        const mappedEdges: Edge[] = rawEdges.map((edge: any, index: number) => ({
          id: `${edge.source}-${edge.target}-${index}`,
          source: edge.source,
          target: edge.target,
          type: 'smoothstep',
          animated: true,
          label: edge.type,
          style: { stroke: '#6366f1', strokeWidth: 2 },
          labelStyle: { fill: '#111827', fontWeight: 700, fontSize: 10 },
          labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
          labelBgPadding: [4, 2],
          labelBgBorderRadius: 4,
        }));

        setNodes(mappedNodes);
        setEdges(mappedEdges);
      } catch (error) {
        console.error('Failed to fetch fraud network:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setNodes, setEdges]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Loading network graph...
      </div>
    );
  }

  const nodeColor = (node: Node) => {
    return (node.style?.backgroundColor as string) || '#3b82f6';
  };

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
}

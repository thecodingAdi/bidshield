'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getFraudNetwork } from '../lib/api';

const GOV_COLORS = {
  BIDDER: '#1a3a5c',
  DIRECTOR: '#8b0000',
  ADDRESS: '#1e5631',
  BANKACCOUNT: '#b8860b',
  PHONE: '#92400e'
};

export default function FraudNetworkGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getFraudNetwork();
        const rawNodes = data.nodes;
        const rawEdges = data.edges;

        const mappedNodes: Node[] = rawNodes.map((node: any, index: number) => {
          const type = node.type.toUpperCase();
          const backgroundColor = GOV_COLORS[type as keyof typeof GOV_COLORS] || '#4b5563';

          let label = '';
          if (type === 'BIDDER' || type === 'DIRECTOR') label = node.props.name;
          else if (type === 'ADDRESS') label = node.props.full.substring(0, 15) + '...';
          else if (type === 'BANKACCOUNT') label = node.props.number;
          else if (type === 'PHONE') label = node.props.number;

          return {
            id: node.id,
            position: { x: Math.random() * 600, y: Math.random() * 400 },
            data: { label: label },
            style: {
              background: backgroundColor,
              color: '#fff',
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              border: 'none',
              width: 120,
              padding: '10px',
              textAlign: 'center',
              borderRadius: '0px', // STRICT SHARP CORNERS
            },
          };
        });

        const mappedEdges: Edge[] = rawEdges.map((edge: any, index: number) => ({
          id: `e${index}-${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          label: edge.type.replace('_', ' '),
          labelStyle: { fontSize: '8px', fill: '#6b7280', fontWeight: 'bold' },
          animated: true,
          style: { stroke: '#94a3b8', strokeWidth: 1.5 },
        }));

        setNodes(mappedNodes);
        setEdges(mappedEdges);
      } catch (error) {
        console.error('Failed to fetch fraud network:', error);
        setNodes([
          { id: 'b2', type: 'default', position: { x: 150, y: 150 }, data: { label: 'BETA INFRA LTD' }, style: { background: '#1a3a5c', color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', border: 'none', width: 120, padding: '10px', textAlign: 'center', borderRadius: '0px' } },
          { id: 'b5', type: 'default', position: { x: 150, y: 350 }, data: { label: 'EPSILON CORP' }, style: { background: '#1a3a5c', color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', border: 'none', width: 120, padding: '10px', textAlign: 'center', borderRadius: '0px' } },
          { id: 'd1', type: 'default', position: { x: 350, y: 250 }, data: { label: 'RAJESH KUMAR' }, style: { background: '#8b0000', color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', border: 'none', width: 120, padding: '10px', textAlign: 'center', borderRadius: '0px' } },
          { id: 'a1', type: 'default', position: { x: 550, y: 250 }, data: { label: '42 LAJPAT NGR' }, style: { background: '#1e5631', color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', border: 'none', width: 120, padding: '10px', textAlign: 'center', borderRadius: '0px' } },
        ]);
        setEdges([
          { id: 'e1', source: 'b2', target: 'd1', label: 'HAS DIRECTOR', labelStyle: { fontSize: '8px', fill: '#6b7280', fontWeight: 'bold' }, animated: true, style: { stroke: '#94a3b8', strokeWidth: 1.5 } },
          { id: 'e2', source: 'b5', target: 'd1', label: 'HAS DIRECTOR', labelStyle: { fontSize: '8px', fill: '#6b7280', fontWeight: 'bold' }, animated: true, style: { stroke: '#94a3b8', strokeWidth: 1.5 } },
          { id: 'e3', source: 'b2', target: 'a1', label: 'REGISTERED AT', labelStyle: { fontSize: '8px', fill: '#6b7280', fontWeight: 'bold' }, animated: true, style: { stroke: '#94a3b8', strokeWidth: 1.5 } },
          { id: 'e4', source: 'b5', target: 'a1', label: 'REGISTERED AT', labelStyle: { fontSize: '8px', fill: '#6b7280', fontWeight: 'bold' }, animated: true, style: { stroke: '#94a3b8', strokeWidth: 1.5 } },
        ]);
      }
    };

    fetchData();
  }, [setNodes, setEdges]);

  return (
    <div className="w-full h-full bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#f1f5f9" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

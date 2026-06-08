from typing import TypedDict
from langgraph.graph import StateGraph

from agents.trend_agent import analyze_trends
from agents.risk_agent import analyze_risks
from agents.recommendation_agent import generate_recommendations


class InsightState(TypedDict):

    data: dict

    trends: str

    risks: str

    recommendation: str


builder = StateGraph(InsightState)

builder.add_node(
    "trend_analysis",
    analyze_trends
)

builder.add_node(
    "risk_analysis",
    analyze_risks
)

builder.add_node(
    "recommendation",
    generate_recommendations
)

builder.add_edge(
    "trend_analysis",
    "risk_analysis"
)

builder.add_edge(
    "risk_analysis",
    "recommendation"
)

builder.set_entry_point(
    "trend_analysis"
)

graph = builder.compile()
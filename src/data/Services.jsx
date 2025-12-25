import {
  Factory,
  Settings,
  Zap,
  Shield,
  Wrench,
  TrendingUp,
} from "lucide-react";

export const services = [
  {
    title: "Electrical Contracting & Consulting",
    desc: "Complete electrical contracting, planning, and consultancy services for industrial projects.",
    icon: Wrench,
    color: "yellow",
    features: [
      "Industrial electrical consulting",
      "HT & LT electrical works",
      "Project planning & execution",
      "Compliance with safety standards",
    ],
    badge: "Core Service",
    stats: { rating: "5.0", projects: "200+" },
  },

  {
    title: "Control Panel Manufacturing",
    desc: "Design and manufacturing of customized control panels as per industrial requirements.",
    icon: Settings,
    color: "blue",
    features: [
      "APFC, MCC & PCC panels",
      "PLC & VFD panels",
      "Multi Party & Remote Desk panels",
      "Customized panel solutions",
    ],
    badge: "In-House",
    stats: { rating: "5.0", projects: "300+" },
  },

  {
    title: "HT & LT Substation Works",
    desc: "Erection, testing, commissioning, and maintenance of HT & LT substations.",
    icon: Factory,
    color: "purple",
    features: [
      "Substation erection",
      "Transformer installation",
      "Testing & commissioning",
      "Preventive maintenance",
    ],
  },

  {
    title: "Industrial Electrification",
    desc: "Complete industrial electrification for factories, plants, and processing units.",
    icon: Zap,
    color: "green",
    features: [
      "Plant-wide electrification",
      "Cable laying & termination",
      "Panel interconnections",
      "Reliable power distribution",
    ],
    stats: { rating: "4.9", projects: "150+" },
  },

  {
    title: "Automation & DCS Solutions",
    desc: "Automation solutions using PLC, VFD, Soft Starter and DCS integration.",
    icon: TrendingUp,
    color: "orange",
    features: [
      "PLC-based automation",
      "VFD & Soft Starter integration",
      "DCS system support",
      "Remote monitoring solutions",
    ],
    badge: "Advanced",
  },

  {
    title: "Testing, Commissioning & Support",
    desc: "Professional testing, commissioning, and post-installation technical support.",
    icon: Shield,
    color: "red",
    features: [
      "System testing & validation",
      "Safety compliance checks",
      "Detailed documentation",
      "24/7 technical support",
    ],
  },
];

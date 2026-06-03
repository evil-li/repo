export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Spacing = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type LayoutMode = "row" | "column" | "grid" | "absolute" | "unknown";

export type StyleRef = {
  colorToken?: string;
  backgroundToken?: string;
  borderColorToken?: string;
  radiusToken?: string;
  shadowToken?: string;
  typographyToken?: string;
  spacingToken?: string;
};

export type PrimitiveKind =
  | "text"
  | "image"
  | "icon"
  | "divider"
  | "container";

export type SemanticKind =
  | "page"
  | "section"
  | "header"
  | "footer"
  | "navbar"
  | "sidebar"
  | "hero"
  | "card"
  | "button"
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "badge"
  | "avatar"
  | "tabs"
  | "table"
  | "list"
  | "modal"
  | "form"
  | "unknown";

export type DesignNode = {
  id: string;
  name: string;
  semanticKind: SemanticKind;
  primitiveKind?: PrimitiveKind;
  bounds: Bounds;
  visible: boolean;
  textContent?: string;
  assetRef?: string;
  layout: {
    mode: LayoutMode;
    gap?: number;
    padding?: Spacing;
    justify?: string;
    align?: string;
    wrap?: boolean;
    columns?: number;
  };
  styleRefs: StyleRef;
  props: Record<string, unknown>;
  children: DesignNode[];
  sourceMeta: {
    mcpNodeId?: string;
    componentName?: string;
    componentId?: string;
    confidence?: number;
  };
};

export type DesignIR = {
  version: string;
  page: {
    id: string;
    name: string;
    route: string;
    width: number;
    height: number;
  };
  tokens: {
    colors: Record<string, string>;
    spacing: Record<string, string>;
    radius: Record<string, string>;
    shadows: Record<string, string>;
    typography: Record<string, Record<string, string>>;
  };
  assets: Array<{
    id: string;
    type: "svg" | "png" | "jpg" | "webp";
    path: string;
    nodeId?: string;
  }>;
  tree: DesignNode;
};

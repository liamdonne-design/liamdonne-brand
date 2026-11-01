"use client";

// ---------------------------------------------------------------------------
// Iconsax glyphs (Linear variant) for every slot the components look up (see
// icon-context). FluidRoot passes this map to the provider, so every Fluid
// component draws Iconsax. Iconsax strokes are fixed, so `strokeWidth` is
// ignored; `size` and `className` pass through, colour follows the text.
// A few slots have no bare Iconsax glyph and reuse a neighbour (noted below).
// ---------------------------------------------------------------------------

import {
  Add,
  ArrowDown,
  ArrowDown2,
  ArrowLeft,
  ArrowRight,
  ArrowRight2,
  ArrowSwapVertical,
  ArrowUp,
  Book,
  Brush2,
  Calendar,
  Clock,
  ColorSwatch,
  Colorfilter,
  Copy,
  Cpu,
  Direct,
  Edit2,
  Element3,
  Flash,
  Folder,
  Global,
  HambergerMenu,
  Heart,
  Home2,
  Image,
  InfoCircle,
  LampOn,
  Link,
  Lock,
  Maximize4,
  Message,
  Monitor,
  Moon,
  More,
  Next,
  Notification,
  Pause,
  People,
  Play,
  Record,
  Refresh2,
  RotateLeft,
  SearchNormal1,
  Setting2,
  Setting4,
  Shield,
  SidebarLeft,
  SidebarRight,
  Sms,
  Star1,
  Sun1,
  TickCircle,
  User,
  type Icon,
} from "iconsax-react";
import type { IconComponent, IconComponentProps, IconName } from "@/lib/icon-context";

function iconsax(Glyph: Icon, extraClass = ""): IconComponent {
  return function IconsaxAdapter({ size, className }: IconComponentProps) {
    return (
      <Glyph
        size={size ?? 16}
        color="currentColor"
        variant="Linear"
        className={[extraClass, className].filter(Boolean).join(" ") || undefined}
      />
    );
  };
}

export const iconsaxIcons: Record<IconName, IconComponent> = {
  "chevron-right": iconsax(ArrowRight2),
  "chevron-down": iconsax(ArrowDown2),
  "pipette": iconsax(Colorfilter),
  // no bare cross in Iconsax: the plus, turned 45°
  "x": iconsax(Add, "rotate-45"),
  "copy": iconsax(Copy),
  "menu": iconsax(HambergerMenu),
  "dot": iconsax(Record),
  "monitor": iconsax(Monitor),
  "sun": iconsax(Sun1),
  "moon": iconsax(Moon),
  "rectangle-horizontal": iconsax(Element3),
  "circle": iconsax(Record),
  "square-library": iconsax(Book),
  "clock": iconsax(Clock),
  "star": iconsax(Star1),
  "settings": iconsax(Setting2),
  "plus": iconsax(Add),
  "arrow-left": iconsax(ArrowLeft),
  "arrow-right": iconsax(ArrowRight),
  "arrow-up": iconsax(ArrowUp),
  "arrow-down": iconsax(ArrowDown),
  "search": iconsax(SearchNormal1),
  "loader": iconsax(Refresh2),
  "users": iconsax(People),
  "lock": iconsax(Lock),
  "mail": iconsax(Sms),
  "bell": iconsax(Notification),
  "shield": iconsax(Shield),
  "palette": iconsax(ColorSwatch),
  "lightbulb": iconsax(LampOn),
  // no rocket in Iconsax: Flash carries "launch / speed"
  "rocket": iconsax(Flash),
  "heart": iconsax(Heart),
  "paintbrush": iconsax(Brush2),
  "brain": iconsax(Cpu),
  "globe": iconsax(Global),
  "user": iconsax(User),
  "image": iconsax(Image),
  "link": iconsax(Link),
  "check": iconsax(TickCircle),
  "rotate-ccw": iconsax(RotateLeft),
  "play": iconsax(Play),
  "pause": iconsax(Pause),
  "home": iconsax(Home2),
  "message-circle": iconsax(Message),
  "inbox": iconsax(Direct),
  "pencil": iconsax(Edit2),
  "scaling": iconsax(Maximize4),
  "skip-forward": iconsax(Next),
  // no corner arrows in Iconsax: the straight ones
  "corner-down-right": iconsax(ArrowRight),
  "corner-down-left": iconsax(ArrowLeft),
  "panel-left": iconsax(SidebarLeft),
  "panel-right": iconsax(SidebarRight),
  "chevrons-up-down": iconsax(ArrowSwapVertical),
  "more-horizontal": iconsax(More),
  "more-vertical": iconsax(More, "rotate-90"),
  "calendar": iconsax(Calendar),
  "folder": iconsax(Folder),
  "sliders-horizontal": iconsax(Setting4),
  "info": iconsax(InfoCircle),
};

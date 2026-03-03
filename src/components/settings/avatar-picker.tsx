"use client";

import { useState } from "react";

export const GRADIENT_AVATARS = [
  {
    id: "lava-sunset",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fda085 100%)",
    name: "Sunset",
  },
  {
    id: "lava-ocean",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 40%, #43e97b 100%)",
    name: "Ocean",
  },
  {
    id: "lava-purple",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #a6c1ee 100%)",
    name: "Lavender",
  },
  {
    id: "lava-ember",
    gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 40%, #ff6a00 100%)",
    name: "Ember",
  },
] as const;

export type AvatarId = (typeof GRADIENT_AVATARS)[number]["id"];

export function getAvatarById(id: string) {
  return GRADIENT_AVATARS.find((a) => a.id === id) ?? GRADIENT_AVATARS[0];
}

export function getStoredAvatarId(): AvatarId {
  if (typeof window === "undefined") return GRADIENT_AVATARS[0].id;
  return (localStorage.getItem("avatar-id") as AvatarId) ?? GRADIENT_AVATARS[0].id;
}

export function GradientAvatar({
  avatarId,
  size = 36,
  className = "",
}: {
  avatarId: string;
  size?: number;
  className?: string;
}) {
  const avatar = getAvatarById(avatarId);
  return (
    <div
      className={`rounded-full shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: avatar.gradient,
      }}
    />
  );
}

interface AvatarPickerProps {
  currentAvatarId: string;
  onSelect: (id: AvatarId) => void;
}

export function AvatarPicker({ currentAvatarId, onSelect }: AvatarPickerProps) {
  const [selected, setSelected] = useState(currentAvatarId);

  function handleSelect(id: AvatarId) {
    setSelected(id);
    localStorage.setItem("avatar-id", id);
    window.dispatchEvent(new Event("avatar-changed"));
    onSelect(id);
  }

  return (
    <div className="flex gap-5">
      {GRADIENT_AVATARS.map((avatar) => {
        const isSelected = selected === avatar.id;
        return (
          <button
            key={avatar.id}
            onClick={() => handleSelect(avatar.id)}
            className="flex flex-col items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
          >
            <div
              className={`h-16 w-16 rounded-full transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              style={{ background: avatar.gradient }}
            />
            <span
              className={`text-[10px] transition-colors duration-200 ${
                isSelected ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {avatar.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

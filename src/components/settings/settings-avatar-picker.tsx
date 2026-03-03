"use client";

import { useState, useEffect } from "react";
import { AvatarPicker, getStoredAvatarId } from "./avatar-picker";
import type { AvatarId } from "./avatar-picker";

export function SettingsAvatarPicker() {
  const [avatarId, setAvatarId] = useState<AvatarId>("lava-sunset");

  useEffect(() => {
    setAvatarId(getStoredAvatarId());
  }, []);

  return <AvatarPicker currentAvatarId={avatarId} onSelect={setAvatarId} />;
}

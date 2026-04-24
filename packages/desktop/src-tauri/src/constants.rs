use tauri_plugin_window_state::StateFlags;

pub const SETTINGS_STORE: &str = "opencode.settings.dat";
pub const DEFAULT_SERVER_URL_KEY: &str = "defaultServerUrl";
pub const WSL_ENABLED_KEY: &str = "wslEnabled";
pub const UPDATER_ENABLED: bool = false;

pub fn window_state_flags() -> StateFlags {
    StateFlags::all() - StateFlags::DECORATIONS - StateFlags::VISIBLE
}

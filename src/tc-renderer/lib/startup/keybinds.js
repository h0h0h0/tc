import key from 'keymaster';
import settings from '../settings/settings';

key.filter = () => true;

function registerShortcuts() {
  key('⌘+n, ctrl+n', goToAddChannel);
  key('⌘+tab, ctrl+tab', nextTab);
  key('⌘+shift+tab, ctrl+shift+tab', previousTab);
  key('⌘+left, ctrl+left', previousTab);
  key('⌘+right, ctrl+right', nextTab);
  key('⌘+s, ctrl+s', toggleSidebar);
  key('tab', focusInput);

  key('⌘+1, ctrl+1', () => tab(1));
  key('⌘+2, ctrl+2', () => tab(2));
  key('⌘+3, ctrl+3', () => tab(3));
  key('⌘+4, ctrl+4', () => tab(4));
  key('⌘+5, ctrl+5', () => tab(5));
  key('⌘+6, ctrl+6', () => tab(6));
  key('⌘+7, ctrl+7', () => tab(7));
  key('⌘+8, ctrl+8', () => tab(8));
  key('⌘+9, ctrl+9', () => tab(9));
}

function tab(index) {
  if (index <= settings.channels.length) settings.selectedTabIndex = index - 1;
}

function toggleSidebar() {
  const a = settings.appearance;
  a.sidebarCollapsed = !a.sidebarCollapsed;
}

function focusInput() {
  const isChannelTab = settings.selectedTabIndex < settings.channels.length;
  if (isChannelTab) focus('#main-input');
  else focus('#join-channel-input');
}

function focus(id) {
  const mainInput = document.querySelector(id);
  const active = document.activeElement;
  if (active.tagName !== 'INPUT' && active !== mainInput) {
    setTimeout(() => mainInput.focus(), 20); // Doesn't work without timeout
  }
}

function nextTab() {
  const newIndex = settings.selectedTabIndex + 1;
  if (newIndex >= settings.channels.length) settings.selectedTabIndex = 0;
  else settings.selectedTabIndex = newIndex;
}

function previousTab() {
  const newIndex = settings.selectedTabIndex - 1;
  if (newIndex < 0) settings.selectedTabIndex = settings.channels.length - 1;
  else settings.selectedTabIndex = newIndex;
}

function goToAddChannel() {
  settings.selectedTabIndex = settings.channels.length;
}

export default registerShortcuts;
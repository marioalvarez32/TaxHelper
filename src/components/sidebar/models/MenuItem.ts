export class MenuItem {
  public Text: string;
  public Icon: string;
  public Path?: string;
  public SubItems?: MenuItem[];

  constructor(menu: MenuItem) {
    this.Text = menu.Text;
    this.Icon = menu.Icon;
    this.Path = menu.Path;
    this.SubItems = menu.SubItems ?? [];
  }
}

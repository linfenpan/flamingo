public partial class MainView: Fuse.App
{
    static MainView()
    {
    }
    public MainView()
    {
        InitializeUX();
    }
    void InitializeUX()
    {
        var temp = new Fuse.Controls.ScrollView();
        var temp1 = new Fuse.Controls.StackPanel();
        var temp2 = new Fuse.Controls.Text();
        var temp3 = new Fuse.Controls.Panel();
        var temp4 = new Fuse.Controls.Text();
        var temp5 = new Fuse.Controls.Text();
        var temp6 = new Fuse.Controls.Rectangle();
        var temp7 = new Fuse.Controls.Text();
        var temp8 = new Fuse.Controls.Grid();
        var temp9 = new Fuse.Controls.Text();
        var temp10 = new Fuse.Controls.Text();
        var temp11 = new Fuse.Controls.Text();
        var temp12 = new Fuse.Controls.Text();
        var temp13 = new Fuse.Controls.Grid();
        var temp14 = new Fuse.Controls.Text();
        var temp15 = new Fuse.Controls.Text();
        var temp16 = new Fuse.Controls.Text();
        var temp17 = new Fuse.Controls.Grid();
        var temp18 = new Fuse.Controls.Text();
        var temp19 = new Fuse.Controls.Text();
        var temp20 = new Fuse.Controls.Text();
        var temp21 = new Fuse.Controls.Grid();
        var temp22 = new Fuse.Controls.Text();
        var temp23 = new Fuse.Controls.Text();
        var temp24 = new Fuse.Controls.Text();
        var temp25 = new Fuse.Controls.Text();
        var temp26 = new Fuse.Controls.WrapPanel();
        var temp27 = new Fuse.Controls.Text();
        var temp28 = new Fuse.Controls.Text();
        var temp29 = new Fuse.Controls.WrapPanel();
        var temp30 = new Fuse.Controls.Rectangle();
        var temp31 = new Fuse.Controls.Rectangle();
        var temp32 = new Fuse.Controls.WrapPanel();
        var temp33 = new Fuse.Controls.Text();
        var temp34 = new Fuse.Controls.Text();
        var temp35 = new Fuse.Controls.Text();
        var temp36 = new Fuse.Controls.DockPanel();
        var temp37 = new MyRectangle();
        var temp38 = new MyRectangle();
        var temp39 = new MyRectangle();
        var temp40 = new MyRectangle();
        var temp41 = new MyRectangle();
        var temp42 = new Fuse.Controls.Text();
        var temp43 = new Fuse.Controls.Panel();
        var temp44 = new Fuse.Controls.Viewbox();
        var temp45 = new Fuse.Controls.Text();
        this.Background = float4(0.9333333f, 0.9333333f, 0.9333333f, 1f);
        temp.Content = temp1;
        temp1.Children.Add(temp2);
        temp1.Children.Add(temp3);
        temp1.Children.Add(temp7);
        temp1.Children.Add(temp8);
        temp1.Children.Add(temp13);
        temp1.Children.Add(temp17);
        temp1.Children.Add(temp21);
        temp1.Children.Add(temp25);
        temp1.Children.Add(temp26);
        temp1.Children.Add(temp29);
        temp1.Children.Add(temp32);
        temp1.Children.Add(temp35);
        temp1.Children.Add(temp36);
        temp1.Children.Add(temp42);
        temp1.Children.Add(temp43);
        temp2.Value = "Panel:";
        temp2.FontSize = 18f;
        temp2.TextColor = float4(0.1176471f, 0.6235294f, 0.972549f, 1f);
        temp2.Margin = float4(0f, 20f, 0f, 5f);
        temp3.Height = 50f;
        temp3.Children.Add(temp4);
        temp3.Children.Add(temp5);
        temp3.Children.Add(temp6);
        temp4.Value = "This...";
        temp5.Value = "..will be on center of panel";
        temp5.Alignment = Fuse.Elements.Alignment.Center;
        temp6.Color = float4(0.4f, 0.4666667f, 0.5333334f, 1f);
        temp6.Width = 20f;
        temp6.Height = 20f;
        temp6.Alignment = Fuse.Elements.Alignment.BottomRight;
        temp7.Value = "Gird:";
        temp7.FontSize = 18f;
        temp7.TextColor = float4(0.1176471f, 0.6235294f, 0.972549f, 1f);
        temp7.Margin = float4(0f, 20f, 0f, 5f);
        temp8.RowCount = 2;
        temp8.ColumnCount = 2;
        temp8.Children.Add(temp9);
        temp8.Children.Add(temp10);
        temp8.Children.Add(temp11);
        temp8.Children.Add(temp12);
        temp9.Value = "four cell1";
        temp10.Value = "four cell2";
        temp11.Value = "four cell3";
        temp12.Value = "four cell4";
        temp13.Rows = "50,50,100";
        temp13.Children.Add(temp14);
        temp13.Children.Add(temp15);
        temp13.Children.Add(temp16);
        temp14.Value = "Row 1";
        temp14.Alignment = Fuse.Elements.Alignment.Center;
        temp15.Value = "Row 2";
        temp15.Alignment = Fuse.Elements.Alignment.Center;
        temp16.Value = "Row 3";
        temp16.Alignment = Fuse.Elements.Alignment.Center;
        temp17.Columns = "1*,1*,3*";
        temp17.Children.Add(temp18);
        temp17.Children.Add(temp19);
        temp17.Children.Add(temp20);
        temp18.Value = "column 1";
        temp19.Value = "column 2";
        temp20.Value = "column 3";
        temp21.Columns = "auto,auto,1*";
        temp21.Children.Add(temp22);
        temp21.Children.Add(temp23);
        temp21.Children.Add(temp24);
        temp22.Value = "column 1";
        temp22.Padding = float4(10f, 10f, 10f, 10f);
        temp23.Value = "column 2";
        temp23.Padding = float4(10f, 10f, 10f, 10f);
        temp24.Value = "column 3";
        temp24.Padding = float4(10f, 10f, 10f, 10f);
        temp25.Value = "WrapPanel:";
        temp25.FontSize = 18f;
        temp25.TextColor = float4(0.1176471f, 0.6235294f, 0.972549f, 1f);
        temp25.Margin = float4(0f, 20f, 0f, 5f);
        temp26.Children.Add(temp27);
        temp26.Children.Add(temp28);
        temp27.Value = "wrap panel test~, ";
        temp28.Value = "we're in same line!";
        temp29.FlowDirection = Fuse.Layouts.FlowDirection.RightToLeft;
        temp29.Children.Add(temp30);
        temp29.Children.Add(temp31);
        temp30.Color = Fuse.Drawing.Colors.Blue;
        temp30.Width = 50f;
        temp30.Height = 50f;
        temp30.Margin = float4(5f, 5f, 5f, 5f);
        temp31.Color = Fuse.Drawing.Colors.Red;
        temp31.Width = 50f;
        temp31.Height = 50f;
        temp31.Margin = float4(5f, 5f, 5f, 5f);
        temp32.Orientation = Fuse.Layouts.Orientation.Vertical;
        temp32.Children.Add(temp33);
        temp32.Children.Add(temp34);
        temp33.Value = "first text";
        temp34.Value = "second text";
        temp35.Value = "DockPanel:";
        temp35.FontSize = 18f;
        temp35.TextColor = float4(0.1176471f, 0.6235294f, 0.972549f, 1f);
        temp35.Margin = float4(0f, 20f, 0f, 5f);
        temp36.Children.Add(temp37);
        temp36.Children.Add(temp38);
        temp36.Children.Add(temp39);
        temp36.Children.Add(temp40);
        temp36.Children.Add(temp41);
        temp37.Color = Fuse.Drawing.Colors.Teal;
        temp38.Color = Fuse.Drawing.Colors.Green;
        global::Fuse.Controls.DockPanel.SetDock(temp38, Fuse.Layouts.Dock.Top);
        temp39.Color = Fuse.Drawing.Colors.Blue;
        global::Fuse.Controls.DockPanel.SetDock(temp39, Fuse.Layouts.Dock.Bottom);
        temp40.Color = Fuse.Drawing.Colors.Yellow;
        global::Fuse.Controls.DockPanel.SetDock(temp40, Fuse.Layouts.Dock.Left);
        temp41.Color = Fuse.Drawing.Colors.Red;
        global::Fuse.Controls.DockPanel.SetDock(temp41, Fuse.Layouts.Dock.Right);
        temp42.Value = "Viewbox:";
        temp42.FontSize = 18f;
        temp42.TextColor = float4(0.1176471f, 0.6235294f, 0.972549f, 1f);
        temp42.Margin = float4(0f, 20f, 0f, 5f);
        temp43.Width = 250f;
        temp43.Height = 100f;
        temp43.ClipToBounds = true;
        temp43.Children.Add(temp44);
        temp44.StretchMode = Fuse.Elements.StretchMode.PixelPrecise;
        temp44.Content = temp45;
        temp45.Value = "Text";
        temp45.FontSize = 100f;
        temp45.TextColor = float4(0.1176471f, 0.6235294f, 0.9686275f, 1f);
        this.RootNode = temp;
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

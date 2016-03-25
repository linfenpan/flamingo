public partial class MainView: Fuse.App
{
    [global::Uno.UX.UXGlobalResource("msyh")] public static readonly Fuse.Font msyh;
    static MainView()
    {
        msyh = new Fuse.Font(new global::Uno.UX.BundleFileSource(import global::Uno.IO.BundleFile("../../../test001/msyh.ttf")));
        global::Uno.UX.Resource.SetGlobalKey(msyh, "msyh");
    }
    public MainView()
    {
        InitializeUX();
    }
    void InitializeUX()
    {
        var temp = new Fuse.Controls.StackPanel();
        var temp1 = new Fuse.Controls.Text();
        var temp2 = new Fuse.Controls.Text();
        var temp3 = new Fuse.Controls.Text();
        var temp4 = new Fuse.Controls.Text();
        this.Background = float4(0.9333333f, 0.9333333f, 0.9333333f, 1f);
        temp.Children.Add(temp1);
        temp.Children.Add(temp2);
        temp.Children.Add(temp3);
        temp.Children.Add(temp4);
        temp1.Value = "Left";
        temp1.TextColor = float4(0.6f, 0.6f, 0.6f, 1f);
        temp2.Value = "Center";
        temp2.TextAlignment = Fuse.Elements.TextAlignment.Center;
        temp3.Value = "Right";
        temp3.FontSize = 24f;
        temp3.TextAlignment = Fuse.Elements.TextAlignment.Right;
        temp4.Value = "Multiple\n\t\t\tLines";
        temp4.LineSpacing = 10f;
        this.RootNode = temp;
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

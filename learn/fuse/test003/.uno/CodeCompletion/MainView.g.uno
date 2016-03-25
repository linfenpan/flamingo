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
        var temp1 = new Fuse.Controls.Image();
        var temp2 = new Fuse.Controls.Image();
        this.Background = float4(0.9333333f, 0.9333333f, 0.9333333f, 1f);
        temp.Children.Add(temp1);
        temp.Children.Add(temp2);
        temp1.Width = 220f;
        temp1.Height = 220f;
        temp1.File = new global::Uno.UX.BundleFileSource(import global::Uno.IO.BundleFile("../../../test001/assert/personal.jpg"));
        temp2.Url = "http://linfenpan.github.io/assert/personal.jpg";
        temp2.Width = 120f;
        temp2.Height = 120f;
        this.RootNode = temp;
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

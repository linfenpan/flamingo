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
        var temp = new Fuse.Controls.ScrollView();
        this.Background = float4(0.9333333f, 0.9333333f, 0.9333333f, 1f);
        this.RootNode = temp;
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

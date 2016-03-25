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
        this.Background = float4(0.9333333f, 0.9333333f, 0.9333333f, 1f);
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

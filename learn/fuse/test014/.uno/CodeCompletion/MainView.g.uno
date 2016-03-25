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
        var temp = new Fuse.Elements.Viewport();
        var temp1 = new Fuse.Controls.Panel();
        var temp2 = new Fuse.Controls.Rectangle();
        var temp3 = new Fuse.Gestures.Clicked();
        var temp4 = new Fuse.Animations.Rotate();
        var temp5 = new Fuse.Drawing.StaticSolidColor(float4(0.1803922f, 0.8f, 0.4431373f, 1f));
        temp.Perspective = 400f;
        temp.RootNode = temp1;
        temp1.Children.Add(temp2);
        temp2.Width = 200f;
        temp2.Height = 200f;
        temp2.Background = temp5;
        temp2.Behaviors.Add(temp3);
        temp3.Animators.Add(temp4);
        temp4.DegreesX = 360f;
        temp4.Easing = Fuse.Animations.Easing.QuadraticInOut;
        temp4.Duration = 1.5;
        temp4.DurationBack = 1;
        this.RootNode = temp;
        this.Theme = Fuse.BasicTheme.BasicTheme.Singleton;
    }
}

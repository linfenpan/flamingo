public partial class MyRectangle: Fuse.Controls.Rectangle
{
    static MyRectangle()
    {
    }
    public MyRectangle()
    {
        InitializeUX();
    }
    void InitializeUX()
    {
        this.MinWidth = 50f;
        this.MinHeight = 50f;
    }
}
